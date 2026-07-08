#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"
LOG_FILE="${LOG_FILE:-/tmp/lekkistart-tunnel.log}"

# Note: We avoid piping to `tee` because in some non-interactive/tmux modes
# the tunnel process can terminate early (leaving an invalid/expired URL).
# Instead, we redirect output directly to the log file.
npx --yes cloudflared tunnel --protocol http2 --url "http://127.0.0.1:${PORT}" > "$LOG_FILE" 2>&1
