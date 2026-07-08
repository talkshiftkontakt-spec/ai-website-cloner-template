#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-3000}"
HOSTNAME="${HOSTNAME:-0.0.0.0}"

cd "$ROOT"

if [ ! -f ".next/standalone/server.js" ]; then
  npm run build
fi

export PORT HOSTNAME
cd .next/standalone
exec node server.js
