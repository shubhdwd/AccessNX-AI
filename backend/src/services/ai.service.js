const Groq = require('groq-sdk');
const { GROQ_API_KEY } = require('../config/env');

const groq = new Groq({ apiKey: GROQ_API_KEY });

const enrichIssuesWithAI = async (issues, techStack) => {
  const uniqueRules = [...new Set(issues.map(i => i.id))];
  const enrichedMap = {};

  const aiPromises = uniqueRules.map(async (ruleId) => {
    const representativeIssue = issues.find(i => i.id === ruleId);

    // 🔥 CLEAN PROMPT: Just the Steps and the Code. No titles.
    const prompt = `
      You are a WCAG expert. Analyze this issue:
      Rule: ${representativeIssue.id}
      Description: ${representativeIssue.description}
      HTML: ${representativeIssue._html_context}
      Tech Stack: ${techStack || 'Unknown'}

      Return a JSON object with EXACTLY these 3 keys:
      1. "explanation": A simple 1-sentence reason why this matters.
      2. "fix_steps": An array of strings. 
         - If Tech Stack is a CMS (WordPress, Wix, Shopify, etc.), provide non-coding dashboard steps.
         - If Tech Stack is code-based (React, Next.js, HTML), provide developer-focused steps.
      3. "fix_code": A single string containing the valid HTML/CSS/React fix (if applicable).

      EXAMPLE RESPONSE (CMS):
      {
        "explanation": "Screen readers cannot read images without a description.",
        "fix_steps": [
          "Open your page editor.",
          "Click on the image.",
          "Find the 'Alt Text' setting.",
          "Type a description and save."
        ],
        "fix_code": "<img src='...' alt='Description'>"
      }
    `;

    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: { type: "json_object" }
      });

      const rawContent = completion.choices[0].message.content;
      console.log(`\n🤖 RAW AI RESPONSE (${ruleId}):`, rawContent);

      enrichedMap[ruleId] = JSON.parse(rawContent);

    } catch (error) {
      console.error(`❌ AI Error for ${ruleId}:`, error.message);
      enrichedMap[ruleId] = {
        explanation: "Automated explanation unavailable.",
        fix_steps: ["Manual review required."],
        fix_code: ""
      };
    }
  });

  await Promise.all(aiPromises);

  return issues.map(issue => {
    const aiData = enrichedMap[issue.id];
    return {
      ...issue,
      explanation: aiData?.explanation || issue.description,
      fix_steps: aiData?.fix_steps || [], // Array of steps
      fix_code: aiData?.fix_code || "",   // String of code
      // Cleanup
      _html_context: undefined,
      _failure_summary: undefined
    };
  });
};

module.exports = { enrichIssuesWithAI };