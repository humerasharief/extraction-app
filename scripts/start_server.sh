#!/bin/bash
set -e
cd /home/ubuntu/extraction-app

# stop existing pm2 app safely
if pm2 list | grep -q extraction-app; then
  pm2 stop extraction-app || true
  pm2 delete extraction-app || true
fi

# start with pm2 using ecosystem or directly
pm2 start index.js --name extraction-app --watch
pm2 save