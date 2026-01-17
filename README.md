# HN AI Summarizer

A local browser extension and backend service that enhances Hacker News by providing AI-generated summaries of linked articles.

This project implements a hybrid architecture using a client-side UserScript for UI integration and a local Python/Flask server for data processing. It utilizes **Google Gemini 2.5 Flash** for multimodal analysis (Text + Vision) to generate technical summaries that include context from charts, diagrams, and code blocks.

## Key Features

* **Multimodal RAG:** Captures both page text and full-page screenshots to provide context-aware summaries.
* **Local Execution:** The backend runs locally, ensuring API keys and data processing remain on the user's machine.
* **Smart Rendering:** Uses a headless browser (Playwright) to handle lazy-loading assets and dynamic content before analysis.
* **UI Integration:** Seamlessly injects controls into the existing Hacker News interface via Tampermonkey.

## Technical Architecture

The application consists of four main components:
1.  **Frontend (JavaScript):** A Tampermonkey script that modifies the DOM of `news.ycombinator.com` to add selection checkboxes and a "Summarize" trigger.
2.  **API Layer (Flask):** A lightweight local server listening on port 5000 that accepts URLs from the frontend.
3.  **Data Extraction (Playwright):** A headless Chromium instance that renders pages, handles scrolling for lazy-loaded elements, and extracts both text and screenshots.
4.  **Inference (Google Gemini):** The data is sent to the Gemini 2.5 Flash model to generate concise, technical bullet points.

## Prerequisites

* Python 3.8+
* Google AI Studio API Key
* Tampermonkey Browser Extension

## Installation

### 1. Backend Setup
Clone the repository and install the dependencies:

```bash
git clone [https://github.com/YOUR_USERNAME/hn-ai-summarizer.git](https://github.com/YOUR_USERNAME/hn-ai-summarizer.git)
cd hn-ai-summarizer

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install libraries
pip install -r requirements.txt
pip install playwright
python3 -m playwright install chromium
