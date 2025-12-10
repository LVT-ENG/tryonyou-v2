#!/bin/sh
# Simple export script for LIVE IT + TRY-ON demo

set -e
ARCHIVE="TryonApp_export.zip"

# remove any previous archive
rm -f "$ARCHIVE"

# package main files and frontend directory
zip -r "$ARCHIVE" index.html frontend css style.css README.md > /dev/null

echo "Created $ARCHIVE"
