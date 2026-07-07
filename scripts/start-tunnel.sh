#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"
LOG_FILE="${LOG_FILE:-/tmp/lekkistart-tunnel.log}"

exec npx --yes cloudflared tunnel --protocol http2 --url "http://127.0.0.1:${PORT}" 2>&1 | tee "$LOG_FILE"
