#!/bin/bash
set -e

# Fetch the latest commit message
COMMIT_MSG=$(git log -1 --pretty=%B)
echo "Latest commit message: $COMMIT_MSG"

# If commit message contains "rebuild", rebuild everything
if echo "$COMMIT_MSG" | grep -iq "rebuild"; then
  echo "Commit contains 'rebuild': rebuilding all containers"
  CHANGED_DIRS=("bot" "api" "web" "analytics")
else
  # Detect changed directories safely
  if git rev-parse HEAD~1 >/dev/null 2>&1; then
    CHANGED_DIRS=($(git diff --name-only HEAD~1 HEAD | cut -d/ -f1 | sort -u))
  else
    echo "No previous commit detected, building all containers"
    CHANGED_DIRS=("bot" "api" "web" "analytics")
  fi
fi

echo "Changed dirs: ${CHANGED_DIRS[@]}"

# Function to build container if changed
build_if_changed() {
  local dir=$1
  local tag=$2
  local service=$3

  # Check if dir is in array
  if [[ " ${CHANGED_DIRS[@]} " =~ " ${dir} " ]]; then
    echo "Building $tag from $dir..."
    docker build -t "$tag" "./$dir"
    echo "$service" >> changed_services.txt
  else
    echo "Skipping $tag (no changes in $dir)"
  fi
}

# Clear previous run
rm -f changed_services.txt

# Build services
build_if_changed "bot" "dd-multitool-bot:latest" "bot"
build_if_changed "api" "dd-multitool-api:latest" "api"
build_if_changed "web" "dd-multitool-web:latest" "web"
build_if_changed "analytics" "dd-multitool-analytics:latest" "analytics"
