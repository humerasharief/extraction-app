#!/bin/bash
# quick check that node server responds on localhost:3000 (adjust port if needed)
curl -fsS http://127.0.0.1:3000/ || exit 1