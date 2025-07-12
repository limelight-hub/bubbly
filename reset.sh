#!/bin/bash

echo "🔁 Resetting Next.js + Prisma + Supabase environment..."

# 1. Clean up
echo "🧹 Removing .next, .prisma, and node_modules..."
rm -rf .next .prisma node_modules

# 2. Reinstall deps
echo "📦 Installing dependencies..."
pnpm install || npm install

# 3. Re-generate Prisma client
echo "⚙️ Generating Prisma client..."
npx prisma generate

# 4. Force reset DB schema (⚠️ This will wipe all data!)
echo "🧨 Resetting and pushing Prisma schema to the database..."
npx prisma db push

echo "✅ Done! Now you can run 'pnpm dev' or 'npm run dev'"
pnpm run tauri dev
