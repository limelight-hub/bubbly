#!/usr/bin/env node

/**
 * Bubbly Chat API Testing Script
 *
 * This script tests all API endpoints for the Discord clone application.
 *
 * Usage:
 *   1. Install dependencies: npm install axios dotenv
 *   2. Set your auth token: export CLERK_TOKEN="your_token_here"
 *   3. Run the script: node test-api.js
 */

const axios = require("axios")
const readline = require("readline")

// Configuration
const BASE_URL = "http://localhost:1420"
const AUTH_TOKEN = process.env.CLERK_TOKEN

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
}

// Helper function to create colored output
function colorLog(message, color = "white") {
  console.log(colors[color] + message + colors.reset)
}

// API client setup
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
  timeout: 10000,
})

// Test data
let testData = {
  serverId: null,
  channelId: null,
  memberId: null,
  conversationId: null,
}

// Test functions
async function testCreateServer() {
  colorLog("\n🏠 Testing: Create Server", "cyan")

  try {
    const response = await api.post("/api/servers", {
      name: "Test Server " + Date.now(),
      imageUrl: "https://via.placeholder.com/150",
    })

    testData.serverId = response.data.id
    testData.channelId = response.data.channels[0]?.id
    testData.memberId = response.data.members[0]?.id

    colorLog("✅ Server created successfully", "green")
    colorLog(`   Server ID: ${testData.serverId}`, "white")
    colorLog(`   Channel ID: ${testData.channelId}`, "white")
    colorLog(`   Member ID: ${testData.memberId}`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to create server", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
    throw error
  }
}

async function testUpdateServer() {
  colorLog("\n🔄 Testing: Update Server", "cyan")

  if (!testData.serverId) {
    colorLog("❌ No server ID available", "red")
    return
  }

  try {
    const response = await api.patch(`/api/servers/${testData.serverId}`, {
      name: "Updated Test Server " + Date.now(),
      imageUrl: "https://via.placeholder.com/200",
    })

    colorLog("✅ Server updated successfully", "green")
    colorLog(`   New name: ${response.data.name}`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to update server", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testRegenerateInviteCode() {
  colorLog("\n🔑 Testing: Regenerate Invite Code", "cyan")

  if (!testData.serverId) {
    colorLog("❌ No server ID available", "red")
    return
  }

  try {
    const response = await api.patch(
      `/api/servers/${testData.serverId}/invite-code`
    )

    colorLog("✅ Invite code regenerated successfully", "green")
    colorLog(`   New invite code: ${response.data.inviteCode}`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to regenerate invite code", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testGetMessages() {
  colorLog("\n💬 Testing: Get Messages", "cyan")

  if (!testData.channelId) {
    colorLog("❌ No channel ID available", "red")
    return
  }

  try {
    const response = await api.get(
      `/api/messages?channelId=${testData.channelId}`
    )

    colorLog("✅ Messages retrieved successfully", "green")
    colorLog(`   Message count: ${response.data.items.length}`, "white")
    colorLog(
      `   Has next cursor: ${response.data.nextCursor ? "Yes" : "No"}`,
      "white"
    )

    return response.data
  } catch (error) {
    colorLog("❌ Failed to get messages", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testGetDirectMessages() {
  colorLog("\n💬 Testing: Get Direct Messages", "cyan")

  // Skip this test if no conversation ID (this would require actual conversations)
  if (!testData.conversationId) {
    colorLog("⚠️  Skipping direct messages test (no conversation ID)", "yellow")
    return
  }

  try {
    const response = await api.get(
      `/api/direct-messages?conversationId=${testData.conversationId}`
    )

    colorLog("✅ Direct messages retrieved successfully", "green")
    colorLog(`   Message count: ${response.data.items.length}`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to get direct messages", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testUpdateChannel() {
  colorLog("\n📺 Testing: Update Channel", "cyan")

  if (!testData.channelId || !testData.serverId) {
    colorLog("❌ No channel or server ID available", "red")
    return
  }

  try {
    const response = await api.patch(
      `/api/channels/${testData.channelId}?serverId=${testData.serverId}`,
      {
        name: "updated-test-channel",
        type: "TEXT",
      }
    )

    colorLog("✅ Channel updated successfully", "green")
    colorLog(`   Channel updated in server: ${response.data.name}`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to update channel", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testUpdateMemberRole() {
  colorLog("\n👥 Testing: Update Member Role", "cyan")

  if (!testData.memberId || !testData.serverId) {
    colorLog("❌ No member or server ID available", "red")
    return
  }

  try {
    const response = await api.patch(
      `/api/members/${testData.memberId}?serverId=${testData.serverId}`,
      {
        role: "MODERATOR",
      }
    )

    colorLog("✅ Member role updated successfully", "green")
    colorLog(`   Updated member roles in server`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to update member role", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testDeleteServer() {
  colorLog("\n🗑️  Testing: Delete Server", "cyan")

  if (!testData.serverId) {
    colorLog("❌ No server ID available", "red")
    return
  }

  try {
    const response = await api.delete(`/api/servers/${testData.serverId}`)

    colorLog("✅ Server deleted successfully", "green")
    colorLog(`   Deleted server: ${response.data.name}`, "white")

    return response.data
  } catch (error) {
    colorLog("❌ Failed to delete server", "red")
    colorLog(`   Error: ${error.response?.data?.error || error.message}`, "red")
  }
}

async function testAPIEndpoints() {
  colorLog("🧪 Starting API Tests for Bubbly Chat", "magenta")
  colorLog("=====================================", "magenta")

  if (!AUTH_TOKEN) {
    colorLog("❌ No authentication token provided", "red")
    colorLog("   Please set CLERK_TOKEN environment variable", "red")
    process.exit(1)
  }

  const tests = [
    testCreateServer,
    testUpdateServer,
    testRegenerateInviteCode,
    testGetMessages,
    testGetDirectMessages,
    testUpdateChannel,
    testUpdateMemberRole,
    testDeleteServer,
  ]

  let passedTests = 0
  let failedTests = 0

  for (const test of tests) {
    try {
      await test()
      passedTests++
    } catch (error) {
      failedTests++
    }

    // Small delay between tests
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  colorLog("\n📊 Test Results", "magenta")
  colorLog("===============", "magenta")
  colorLog(`✅ Passed: ${passedTests}`, "green")
  colorLog(`❌ Failed: ${failedTests}`, "red")
  colorLog(`📝 Total: ${passedTests + failedTests}`, "blue")

  if (failedTests === 0) {
    colorLog("\n🎉 All tests passed!", "green")
  } else {
    colorLog("\n⚠️  Some tests failed. Check the logs above.", "yellow")
  }
}

// Interactive mode
async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  colorLog("\n🎮 Interactive API Testing Mode", "magenta")
  colorLog("================================", "magenta")
  colorLog("Available commands:", "white")
  colorLog("1. create-server - Create a new server", "white")
  colorLog("2. update-server - Update server details", "white")
  colorLog("3. regenerate-invite - Regenerate invite code", "white")
  colorLog("4. get-messages - Get channel messages", "white")
  colorLog("5. update-channel - Update channel", "white")
  colorLog("6. update-member - Update member role", "white")
  colorLog("7. delete-server - Delete server", "white")
  colorLog("8. run-all - Run all tests", "white")
  colorLog("9. exit - Exit interactive mode", "white")

  const askCommand = () => {
    rl.question("\nEnter command: ", async (answer) => {
      switch (answer.trim()) {
        case "1":
        case "create-server":
          await testCreateServer()
          break
        case "2":
        case "update-server":
          await testUpdateServer()
          break
        case "3":
        case "regenerate-invite":
          await testRegenerateInviteCode()
          break
        case "4":
        case "get-messages":
          await testGetMessages()
          break
        case "5":
        case "update-channel":
          await testUpdateChannel()
          break
        case "6":
        case "update-member":
          await testUpdateMemberRole()
          break
        case "7":
        case "delete-server":
          await testDeleteServer()
          break
        case "8":
        case "run-all":
          await testAPIEndpoints()
          break
        case "9":
        case "exit":
          rl.close()
          return
        default:
          colorLog("❌ Unknown command", "red")
      }
      askCommand()
    })
  }

  askCommand()
}

// Main execution
async function main() {
  const args = process.argv.slice(2)

  if (args.includes("--interactive") || args.includes("-i")) {
    await interactiveMode()
  } else {
    await testAPIEndpoints()
  }
}

// Handle errors
process.on("uncaughtException", (error) => {
  colorLog("❌ Uncaught Exception:", "red")
  colorLog(error.message, "red")
  process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
  colorLog("❌ Unhandled Rejection at:", "red")
  colorLog(reason, "red")
  process.exit(1)
})

// Export for potential use as module
module.exports = {
  testCreateServer,
  testUpdateServer,
  testRegenerateInviteCode,
  testGetMessages,
  testGetDirectMessages,
  testUpdateChannel,
  testUpdateMemberRole,
  testDeleteServer,
  testAPIEndpoints,
}

// Run if called directly
if (require.main === module) {
  main()
}
