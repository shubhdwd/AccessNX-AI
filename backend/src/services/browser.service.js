const puppeteer = require('puppeteer');

/**
 * Launches a headless browser instance.
 */
const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
};

/**
 * Detects the technology stack of the page.
 */
const detectTechStack = async (page) => {
  return await page.evaluate(() => {
    const generator = document.querySelector('meta[name="generator"]');
    const generatorContent = generator ? generator.content.toLowerCase() : '';

    if (generatorContent.includes('wordpress')) return 'WordPress';
    if (generatorContent.includes('wix')) return 'Wix';
    if (generatorContent.includes('shopify')) return 'Shopify';
    if (generatorContent.includes('squarespace')) return 'Squarespace';
    if (generatorContent.includes('webflow')) return 'Webflow';

    // Check for specific frameworks
    if (document.querySelector('#__next')) return 'Next.js';
    if (document.querySelector('#root')) return 'React (likely)'; // Generic React
    if (window.angular) return 'Angular';
    if (window.Vue) return 'Vue.js';

    return 'Unknown';
  });
};

module.exports = { launchBrowser, detectTechStack };