#!/bin/sh
set -e

# Generate runtime env file
envsubst < /app/env.js > /app/dist/env.runtime.js

# Start the original command
exec "$@"
