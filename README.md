HN AI Summarizer
A local browser extension and backend service that enhances Hacker News by providing AI-generated summaries of linked articles.

This project implements a hybrid architecture using a client-side UserScript for UI integration and a local Python/Flask server for data processing. It utilizes Google Gemini 2.5 Flash for multimodal analysis (Text + Vision) to generate technical summaries.

Key Features
Multimodal RAG: Captures page text and screenshots to provide context-aware summaries.

Local Execution: The backend runs locally, ensuring API keys remain on the user's machine.

Smart Rendering: Uses Playwright to handle lazy-loading assets before analysis.

UI Integration: Injects controls into Hacker News via Tampermonkey.

Technical Architecture
Frontend: Tampermonkey script modifies the DOM of Hacker News.

API Layer: Local Flask server on port 5000.

Extraction: Playwright captures screenshots and text.

Inference: Gemini 2.5 Flash processes the data.

Installation & Setup
Backend: ```bash python3 -m venv .venv source .venv/bin/activate pip install -r requirements.txt python3 -m playwright install chromium


Configuration: Create a .env file and add: GOOGLE_API_KEY=your_key_here

Frontend: Install hn_summarizer.user.js into Tampermonkey.

Usage
Run the server using ./start_server.command and use the "Summarize" button on Hacker News.

License
MIT License