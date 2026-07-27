#!/bin/bash
set -euo pipefail

echo "=== Cleaning PM2 logs on server ==="

ssh -S /tmp/ssh-mux/master $SERVER_USER@$SERVER_HOST "
  pm2 flush kepler-frontend-client &&
  pm2 jlist | jq -r '.[] | .pm2_env.pm_out_log_path, .pm2_env.pm_err_log_path' 2>/dev/null | while read -r f; do
    if [ -f \"\$f\" ]; then
      find \"\$(dirname \"\$f\")\" -name '*.log' -mtime +7 -delete 2>/dev/null || true
    fi
  done
  echo 'PM2 logs flushed, old logs (>7 days) deleted'
"

echo "=== Clean done ==="
