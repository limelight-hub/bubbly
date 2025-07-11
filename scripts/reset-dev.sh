#!/bin/bash

echo "🔁 Resetting local dev environment..."

rm -rf node_modules .next .turbo pnpm-lock.yaml
pnpm install
pnpm prisma generate
pnpm approve-builds

echo "✅ Done. Now run again!"
pnpm run tauri dev
