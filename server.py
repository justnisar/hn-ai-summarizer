import os
import time
import trafilatura
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from playwright.sync_api import sync_playwright
from dotenv import load_dotenv

# 1. Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# 2. Secure Configuration
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("❌ ERROR: No API_KEY found.")
    print("👉 Make sure you have a file named '.env' with GOOGLE_API_KEY=AIzaSy...")
    raise ValueError("Missing GOOGLE_API_KEY in .env file")

client = genai.Client(api_key=API_KEY)

# --- MODEL CONFIGURATION ---
# Attempting to use the latest 2.5 Flash model
MODEL_ID = "gemini-2.5-flash"

def get_page_data(url):
    print(f"🕵️ Processing: {url}")
    try:
        with sync_playwright() as p:
            # Launch browser (headless=True means invisible)
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={'width': 1280, 'height': 1024})
            
            # Load Page (30s timeout)
            page.goto(url, wait_until='domcontentloaded', timeout=30000)
            
            # Smart Scroll (trigger lazy loading images)
            last_height = 0
            for i in range(5):
                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                time.sleep(1) 
                new_height = page.evaluate("document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
            
            # Capture Data
            screenshot_bytes = page.screenshot(full_page=True, type='jpeg', quality=50)
            html_content = page.content()
            clean_text = trafilatura.extract(html_content)
            
            browser.close()
            return clean_text, screenshot_bytes
            
    except Exception as e:
        print(f"❌ Error processing {url}: {e}")
        return None, None

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    urls = data.get('urls', [])
    results = []

    for url in urls:
        text, image_bytes = get_page_data(url)
        
        if not image_bytes:
            results.append({"url": url, "summary": "❌ Failed to load page."})
            continue

        # Prepare Image for Google GenAI SDK
        image_part = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")

        prompt = f"""
        You are a cynical, expert technical lead. Summarize this Hacker News article.
        
        I have provided:
        1. The TEXT.
        2. A FULL PAGE SCREENSHOT.
        
        Rules:
        - Output exactly 3 bullet points.
        - Use **Bold** for key concepts.
        - If the screenshot contains a chart, diagram, or code block that explains the point, mention it.
        
        Article Text:
        {text[:50000] if text else "No text extracted."}
        """

        try:
            print(f"🤖 Sending to {MODEL_ID}...")
            
            response = client.models.generate_content(
                model=MODEL_ID,
                contents=[prompt, image_part]
            )
