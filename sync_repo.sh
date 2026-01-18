#!/bin/bash

# Sync Repo Script
# Usage: ./sync_repo.sh "Your commit message"

COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="chore: Auto-sync update"
fi

echo "🔄 Pulling latest changes..."
git pull origin main

echo "📦 Staging changes..."
git add .

echo "💾 Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Done!"
