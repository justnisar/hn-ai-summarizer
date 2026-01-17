# Hacker News AI Summarizer 🚀

A "Cyborg" browser extension that upgrades Hacker News with Multimodal AI capabilities.

This project uses a hybrid architecture: a **Tampermonkey script** modifies the browser UI to add controls, while a **Python/Flask** backend uses **Playwright** (computer vision) and **Google Gemini 2.5 Flash** to read and summarize articles.

## ✨ Features

* **Multimodal Analysis:** Doesn't just read text—it takes a full screenshot of the page so the AI can "see" charts, diagrams, and code snippets.
* **Visual Upgrade:** Injects a modern UI into Hacker News with bold formatting and clean bullet points.
* **Privacy First:** The AI server runs locally on your machine. Your API keys never leave your `.env` file.
* **Smart Scrolling:** Automatically handles lazy-loading images before capturing content.
* **One-Click Launcher:** Includes a macOS automation script for instant startup.

## 🛠️ Architecture

1.  **The "Hands" (Frontend):** A UserScript (`.user.js`) injects checkboxes and buttons into `news.ycombinator.com`.
2.  **The "Bridge" (Flask):** A local Python server listens for requests on port 5000.
3.  **The "Eyes" (Playwright):** A headless Chromium browser opens the link, scrolls to load assets, and captures a screenshot + text.
4.  **The "Brain" (Gemini 2.5):** Google's Flash model processes the text and image together to generate a cynical, technical summary.

## 📦 Installation

### 1. Backend Setup
Clone the repository and prepare the Python environment.

```bash
git clone [https://github.com/YOUR_USERNAME/hn-ai-summarizer.git](https://github.com/YOUR_USERNAME/hn-ai-summarizer.git)
cd hn-ai-summarizer

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install playwright
python3 -m playwright install chromium
