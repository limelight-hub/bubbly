#!/bin/bash

echo "🔁 Resetting local dev environment..."

rm -rf node_modules .next .turbo pnpm-lock.yaml # chưa đổi repo 
pnpm install
pnpm prisma generate
pnpm approve-builds

echo "✅ Local dev environment reset successfully."

echo ""
echo "❓ What do you want to run now?"
echo "1) Start Web (next dev)"
echo "2) Start Desktop (tauri dev)"
echo "3) Exit"

read -p "Select an option [1-3]: " choice

case "$choice" in
  1)
    echo "🚀 Starting web server..."
    pnpm web
    ;;
  2)
    echo "🚀 Starting desktop app..."
    pnpm desktop
    ;;
  3)
    echo "👋 Exiting. Bye!"
    exit 0
    ;;
  *)
    echo "❌ Invalid option. Exiting."
    exit 1
    ;;
esac
