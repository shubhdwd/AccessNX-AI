const { launchBrowser, detectTechStack } = require('../services/browser.service');
const { runAxeScan } = require('../services/axe.service');
const { enrichIssuesWithAI } = require('../services/ai.service');
const { formatViolations } = require('../utils/format.util');
const { calculateScoreAndBadges } = require('../utils/score.util');

const scanUrl = async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let browser;
  try {
    console.log(`🚀 Starting scan for: ${url}`);

    // 1. Launch Browser
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Optimize loading
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 1.5 Detect Tech Stack
    const techStack = await detectTechStack(page);
    console.log(`💻 Detected Tech Stack: ${techStack}`);

    // 2. Run Axe-Core (Detection)
    console.log('🔍 Running Axe-Core detection...');
    const rawViolations = await runAxeScan(page);
    await browser.close(); // Close early to free resources

    // 3. Format Data
    let formattedIssues = formatViolations(rawViolations);

    // 4. Enrich with AI (Explanation & Fixes)
    // Only process top 5 unique issues to ensure hackathon speed
    console.log('🤖 Consult Groq AI...');
    if (formattedIssues.length > 0) {
      formattedIssues = await enrichIssuesWithAI(formattedIssues, techStack);
    }

    // 5. Calculate Score & Badges
    const { score, badges } = calculateScoreAndBadges(formattedIssues);

    // 6. Send Response
    const response = {
      score,
      badges,
      techStack, // Include detected tech stack in response
      issues: formattedIssues
    };

    console.log('✅ Scan complete.');
    res.json(response);

  } catch (error) {
    if (browser) await browser.close();
    next(error);
  }
};

module.exports = { scanUrl };