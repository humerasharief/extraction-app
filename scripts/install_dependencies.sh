#!/bin/bash
set -e
cd /home/ubuntu/extraction-app

# Backend deps
npm ci --production || npm install

# Build frontend (client)
if [ -d client ]; then
  cd client
  npm ci
  npm run build
  cd ..
fi

# ensure permissions
chown -R ubuntu:www-data /home/ubuntu/extraction-app
chmod -R 750 /home/ubuntu/extraction-app