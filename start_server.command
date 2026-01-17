#!/bin/bash
cd "$(dirname "$0")"
source .venv/bin/activate
echo "🚀 Starting HN Summarizer..."
python3 server.py
echo "Server stopped. Press Enter to close."
read
