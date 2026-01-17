// ==UserScript==
// @name         Hacker News AI Summarizer (Visual Upgrade)
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Summarize HN articles (Now with Bold Text & Clean Bullets)
// @author       You
// @match        https://news.ycombinator.com/*
// @connect      127.0.0.1
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. SETTINGS & STYLES ---
    const MODAL_STYLE = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 700px; max-width: 90%; max-height: 85vh;
        background-color: #ffffff; z-index: 10000; overflow-y: auto;
        padding: 40px; border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        border: 1px solid #e0e0e0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    `;

    const BTN_STYLE = `
        position: fixed; bottom: 30px; right: 30px; z-index: 9999;
        padding: 14px 28px; background-color: #ff6600; color: white;
        border: none; border-radius: 50px; cursor: pointer;
        font-weight: 700; font-size: 14px;
        box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
        transition: transform 0.2s ease;
    `;

    // --- 2. HELPER: BEAUTIFY TEXT ---
    function formatSummary(text) {
        if (!text) return "";
        
        // A. Convert **Bold** to HTML <b> tags
        let html = text.replace(/\*\*(.*?)\*\*/g, '<b style="color:#000;">$1</b>');

        // B. Convert Bullet Points (* ) into proper HTML list items
        const lines = html.split('\n');
        let formatted = '<ul style="padding-left: 20px; margin-top: 0;">';
        
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('* ')) {
                formatted += `<li style="margin-bottom: 12px; line-height: 1.6; color: #333; font-size: 15px;">${line.substring(2)}</li>`;
            } else if (line.length > 0) {
                formatted += `<p style="margin-bottom: 12px; line-height: 1.6; color: #444; font-size: 15px;">${line}</p>`;
            }
        });
        
        formatted += '</ul>';
        return formatted;
    }

    // --- 3. MAIN LOGIC ---
    
    // Add Checkboxes
    document.querySelectorAll('.athing').forEach(item => {
        const titleLine = item.querySelector('.titleline');
        if (titleLine && !item.querySelector('.hn-summary-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'hn-summary-checkbox';
            checkbox.style.marginRight = '12px';
            checkbox.style.cursor = 'pointer';
            checkbox.style.transform = "scale(1.2)";
            
            const link = titleLine.querySelector('a');
            checkbox.value = link.href;
            titleLine.prepend(checkbox);
        }
    });

    // Add Button
    const btn = document.createElement('button');
    btn.innerText = "✨ Summarize Selected";
    btn.style.cssText = BTN_STYLE;
    btn.onmouseover = () => btn.style.transform = "scale(1.05)";
    btn.onmouseout = () => btn.style.transform = "scale(1)";
    document.body.appendChild(btn);

    // Create Modal
    const modal = document.createElement('div');
    modal.style.cssText = MODAL_STYLE;
    modal.style.display = 'none';

    // Modal Header
    const header = document.createElement('div');
    header.style.marginBottom = "20px";
    header.style.textAlign = "right";
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = "background:none; border:none; font-size: 28px; cursor:pointer; color:#999;";
    closeBtn.onclick = () => modal.style.display = 'none';
    header.appendChild(closeBtn);
    modal.appendChild(header);

    // Modal Content
    const contentDiv = document.createElement('div');
    modal.appendChild(contentDiv);
    document.body.appendChild(modal);

    // Handle Click
    btn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.hn-summary-checkbox:checked');
        const urls = Array.from(checkboxes).map(cb => cb.value);

        if (urls.length === 0) return alert("Please select an article first!");

        btn.innerText = "Reading " + urls.length + " pages...";
        btn.disabled = true;
        btn.style.backgroundColor = '#ccc';

        GM_xmlhttpRequest({
            method: "POST",
            url: "http://127.0.0.1:5000/summarize",
            data: JSON.stringify({ urls: urls }),
            headers: { "Content-Type": "application/json" },
            onload: function(response) {
                btn.innerText = "✨ Summarize Selected";
                btn.disabled = false;
                btn.style.backgroundColor = '#ff6600';

                if (response.status !== 200) {
                    return alert("Server Error: " + response.statusText);
                }

                const data = JSON.parse(response.responseText);
                modal.style.display = 'block';
                contentDiv.innerHTML = '';
                
                data.results.forEach(item => {
                    const entry = document.createElement('div');
                    entry.style.marginBottom = '30px';
                    entry.style.borderBottom = '1px solid #eee';
                    entry.style.paddingBottom = '20px';
                    const niceSummary = formatSummary(item.summary);

                    entry.innerHTML = `
                        <h2 style="color:#ff6600; font-size: 18px; margin-bottom:15px; margin-top:0;">
                            <a href="${item.url}" target="_blank" style="text-decoration:none; color:#ff6600; border-bottom: 2px solid #ffe0cc;">
                                ${item.url}
                            </a>
                        </h2>
                        ${niceSummary}
                    `;
                    contentDiv.appendChild(entry);
                });
            },
            onerror: function(err) {
                console.error(err);
                btn.innerText = "Summarize Selected";
                btn.disabled = false;
                btn.style.backgroundColor = '#ff6600';
                alert("Check if python server is running!");
            }
        });
    });
})();
