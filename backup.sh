#!/bin/bash

cd /Users/macbook/Downloads/creator-torch-unzipped || exit

git add .
git commit -m "🕒 Auto-backup at $(date '+%Y-%m-%d %H:%M:%S')" || exit
git push origin main

