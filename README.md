# HN AI Summarizer 🚀

A professional local backend service and browser extension that adds AI-generated summaries to Hacker News articles. 

This project uses **Google Gemini 2.5 Flash** for multimodal analysis, processing both page text and full-page screenshots.

---

## 🛠️ Key Features

* **Multimodal RAG:** Analyzes both text and images for high-context summaries.
* **Local Execution:** Runs locally on your machine to keep API keys secure.
* **Smart Rendering:** Uses Playwright to handle lazy-loading content.
* **Clean UI:** Injects summarized views directly into Hacker News via Tampermonkey.

## ⚙️ Installation

### 1. Backend Setup
Clone the repository and install the Python dependencies:

```bash
git clone [https://github.com/justnisar/hn-ai-summarizer.git](https://github.com/justnisar/hn-ai-summarizer.git)
cd hn-ai-summarizer

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install libraries
pip install -r requirements.txt
python3 -m playwright install chromium
```

### 2. Configuration
Create a `.env` file in the root directory to store your API key:

```bash
echo "GOOGLE_API_KEY=your_actual_api_key" > .env
```

## 🚀 Usage

**1. Start the Server**
Run the backend service using the provided shell script or manually via Python:

```bash
# Option 1: Automation Script
./start_server.command

# Option 2: Manual Start
source .venv/bin/activate
python3 server.py
```

**2. Setup Frontend**
* Ensure the **Tampermonkey** extension is installed in your browser.
* Navigate to the file `hn_summarizer.user.js` in this repository.
* Click the **Raw** button to install the script.

**3. Generating Summaries**
* Open [Hacker News](https://news.ycombinator.com).
* Select the checkboxes next to the articles you wish to read.
* Click the orange **"✨ Summarize Selected"** button.

## 📝 License
This project is open-source and available under the **MIT License**.
