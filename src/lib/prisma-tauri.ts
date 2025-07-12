import { db } from "./db"

// Utility to handle database operations in Tauri environment
export class PrismaTauriHandler {
  private static instance: PrismaTauriHandler
  private isConnected = false
  private reconnectTimeout: NodeJS.Timeout | null = null

  static getInstance() {
    if (!PrismaTauriHandler.instance) {
      PrismaTauriHandler.instance = new PrismaTauriHandler()
    }
    return PrismaTauriHandler.instance
  }

  async ensureConnection() {
    if (this.isConnected) return

    try {
      await db.$connect()
      this.isConnected = true
      console.log("✅ Prisma connected successfully")
    } catch (error) {
      console.error("❌ Prisma connection failed:", error)
      this.scheduleReconnect()
      throw error
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return

    this.reconnectTimeout = setTimeout(async () => {
      try {
        await this.ensureConnection()
        this.reconnectTimeout = null
      } catch (error) {
        this.scheduleReconnect()
      }
    }, 2000)
  }

  async executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
    const maxRetries = 3
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.ensureConnection()
        return await operation()
      } catch (error: any) {
        const isPreparedStatementError = 
          error.message?.includes("prepared statement") &&
          error.message?.includes("does not exist")
        
        const isConnectionError = 
          error.message?.includes("connection") ||
          error.message?.includes("ECONNREFUSED") ||
          error.message?.includes("timeout") ||
          error.message?.includes("Engine is not yet connected")
        
        const isEngineError = 
          error.message?.includes("Engine is not yet connected") ||
          error.message?.includes("napi_register_module_v1")

        if ((isPreparedStatementError || isConnectionError || isEngineError) && attempt < maxRetries) {
          console.log(`🔄 Retrying operation (attempt ${attempt}/${maxRetries}) - Error: ${error.message?.substring(0, 100)}...`)
          
          // Reset connection completely
          this.isConnected = false
          try {
            await db.$disconnect()
          } catch (disconnectError) {
            // Ignore disconnect errors
          }
          
          // Wait progressively longer before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
          continue
        }

        throw error
      }
    }

    throw new Error(`Operation failed after ${maxRetries} retries`)
  }

  async gracefulShutdown() {
    this.isConnected = false
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    
    try {
      await db.$disconnect()
      console.log("✅ Prisma disconnected gracefully")
    } catch (error) {
      console.error("❌ Error during Prisma disconnect:", error)
    }
  }
}

// Export singleton instance
export const prismaTauri = PrismaTauriHandler.getInstance()

// Helper function for easy use
export async function withPrismaRetry<T>(operation: () => Promise<T>): Promise<T> {
  return prismaTauri.executeWithRetry(operation)
}
