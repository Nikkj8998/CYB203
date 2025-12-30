#!/bin/bash
set -e

# Change to backend directory
cd "$(dirname "$0")/backend"

# Make sure port 8000 is free
pkill -f "php -S 0.0.0.0:8000" 2>/dev/null || true

# Start PHP server
exec php -S 0.0.0.0:8000 server.php 2>&1
