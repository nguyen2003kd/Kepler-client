#!/bin/bash
set -euo pipefail

echo "=== Cleaning dangling images on server ==="

ssh -S /tmp/ssh-mux/master $SERVER_USER@$SERVER_HOST "
  docker container prune -f
  docker image prune -f
"

echo "=== Clean done ==="