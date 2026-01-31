const fs = require('fs');
const axeCore = require('axe-core');

/**
 * Injects Axe-Core into the page and runs the scan.
 */
const runAxeScan = async (page) => {
  // Inject the axe-core source code
  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  await page.evaluate(axeSource);

  // Run the scan
  const results = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
      }
    });
  });

  return results.violations; // We only care about violations
};

module.exports = { runAxeScan };