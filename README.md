# 🚀 AccessNX - Next-Gen AI Accessibility Scanner

![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![Puppeteer](https://img.shields.io/badge/Puppeteer-Headless_Chrome-blue) ![Axe-Core](https://img.shields.io/badge/Audit-Axe_Core-orange) ![AI](https://img.shields.io/badge/AI-Llama_3-purple)

**AccessNX** is a high-performance backend engine that doesn't just find accessibility errors—it fixes them. By combining **Puppeteer** (for full DOM rendering) with **Groq AI**, it delivers instant, context-aware remediation for both developers and non-technical content editors.

## 💡 Why AccessNX?
Traditional scanners only give you cryptic error codes. AccessNX provides:
1.  **Dual-Mode Solutions:**
    * **For Developers:** Copy-paste HTML/CSS code snippets.
    * **For Editors:** Step-by-step instructions for CMS platforms (Wix, WordPress, etc.).
2.  **Rendered DOM Scanning:** Detects issues in dynamic JavaScript apps (React, Vue) that static parsers miss.
3.  **Zero Hallucinations:** Uses **Axe-core** for legally accurate detection and AI *only* for explanation and remediation.

## 🛠️ Tech Stack
* **Runtime:** Node.js & Express
* **Browser Engine:** Puppeteer (Headless Chrome)
* **Audit Engine:** Axe-Core (WCAG 2.1 Standard)
* **AI Intelligence:** Groq SDK (Llama-3.3-70b-versatile)
* **Architecture:** Service-Controller Pattern

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/AccessNX.git](https://github.com/YOUR_USERNAME/AccessNX.git)
cd AccessNX/backend
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root directory (see the Environment Variables section below for details).

### 4. Run the Server
```bash
# Development Mode (Hot Reload)
npm run dev

# Production Mode
npm start
```
The server will start on http://localhost:5000

## 🔑 Environment Variables Explained
This project relies on specific environment variables to handle the AI connection and the heavy browser automation.

Create a file named .env in your backend folder and add these:
```bash
PORT=5000
NODE_ENV=development
GROQ_API_KEY=gsk_your_actual_api_key_here

# Optional: Only needed for Cloud Deployment (Render/Railway)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
```
## 📡 API Endpoints
```bash
POST /api/scan
```
Request Body:
```bash
{
  "url": "[https://example.com](https://example.com)"
}
```
Response (JSON):
```bash
{
  "score": 85,
  "issues": [
    {
      "id": "image-alt",
      "explanation": "Screen readers need text descriptions for images.",
      "fix_steps": [
        "Open your website editor.",
        "Click the image.",
        "Add a description to the Alt Text field."
      ],
      "fix_code": "<img src='img.jpg' alt='A happy dog'>"
    }
  ]
}
```


