# HN AI Summarizer 🚀

A professional local backend service and browser extension that adds AI-generated summaries to Hacker News articles. 

This project uses **Google Gemini 2.5 Flash** for multimodal analysis, processing both page text and full-page screenshots.

---

## 🛠️ Key Features

* **Multimodal RAG:** Analyzes both text and images for high-context summaries.
* **Local Execution:** Runs locally on your machine to keep API keys secure.
* **Smart Rendering:** Uses Playwright to handle lazy-loading content.
* **Clean UI:** Injects summarized views directly into Hacker News via Tampermonkey.

## Technical Architecture

The application consists of four main components:
1. **Frontend (JavaScript):** A Tampermonkey script modifies the DOM of Hacker News.
2. **API Layer (Flask):** A local server on port 5000 that accepts URLs.
3. **Data Extraction (Playwright):** A headless browser captures screenshots and text.
4. **Inference (Google Gemini):** Multimodal processing of text and images.

## Prerequisites

* Python 3.8+
* Google AI Studio API Key
* Tampermonkey Browser Extension

## Installation

### 1. Backend Setup
Clone the repository and install the dependencies:

```bash
git clone [https://github.com/justnisar/hn-ai-summarizer.git](https://github.com/justnisar/hn-ai-summarizer.git)
cd hn-ai-summarizer

```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install libraries
pip install -r requirements.txt
python3 -m playwright install chromium

### Chunk 7: Configuration
```markdown
### 2. Configuration
Create a `.env` file in the root directory to store your API key:

```bash
echo "GOOGLE_API_KEY=your_actual_api_key" > .env

### Chunk 8: Usage Instructions
```markdown
## 🚀 Usage

1. **Start the Server:** Run the automation script or start manually:
```bash
./start_server.command

2. **Setup Frontend:** Install `hn_summarizer.user.js` in Tampermonkey.

3. **Summarize:** Click the orange button on any Hacker News page.

## 📝 License
MIT License

### Chunk 9: License (The End)
```markdown
## 📝 License
MIT License
