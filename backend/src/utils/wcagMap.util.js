/**
 * Maps Axe-core tags and IDs to readable WCAG versions and User Groups.
 */
const wcagMap = {
  // --- STANDARDS (Objects) - Do not loop over these ---
  'wcag2a': { standard: 'WCAG 2.1 A', priority: 'High' },
  'wcag2aa': { standard: 'WCAG 2.1 AA', priority: 'Medium' },
  'wcag21a': { standard: 'WCAG 2.1 A', priority: 'High' },
  'wcag21aa': { standard: 'WCAG 2.1 AA', priority: 'Medium' },
  'best-practice': { standard: 'Best Practice', priority: 'Low' },

  // --- USER GROUPS (Arrays) - These map to specific people ---
  'cat.sensory': ['Visually impaired users', 'Screen reader users'],
  'cat.text-alternatives': ['Blind users', 'Screen reader users', 'SEO crawlers'],
  'cat.color': ['Color blind users', 'Low vision users'],
  'cat.keyboard': ['Motor impaired users', 'Keyboard-only users'],
  'cat.structure': ['Screen reader users', 'Cognitive disability users'],
  'cat.aria': ['Screen reader users', 'Assistive technology users'],
  'cat.forms': ['Motor impaired users', 'Screen reader users'],
  'cat.language': ['Screen reader users (pronunciation)', 'Cognitive disability users'],
  'cat.name-role-value': ['Screen reader users', 'Voice control users'],
  'cat.parsing': ['Assistive technology users', 'Developers'],
  'cat.semantics': ['Screen reader users', 'Mobile users'],
  'cat.time-and-media': ['Deaf/Hard of hearing users', 'Epileptic users']
};

const getUserImpact = (tags) => {
  const users = new Set();
  
  // Default fallback if nothing matches
  if (users.size === 0) users.add('Assistive technology users');

  tags.forEach(tag => {
    const mapping = wcagMap[tag];

    // CRITICAL FIX: Only loop if it is an ARRAY (a list of users)
    // This ignores the objects like { standard: 'WCAG...' }
    if (mapping && Array.isArray(mapping)) {
      mapping.forEach(u => users.add(u));
    }

    // Heuristic backups (catch-all)
    if (tag.includes('color')) users.add('Color blind users');
    if (tag.includes('aria')) users.add('Screen reader users');
    if (tag.includes('keyboard')) users.add('Motor impaired users');
  });

  // Convert Set to Array to remove duplicates
  return Array.from(users);
};

const getWcagRule = (tags) => {
  // Find the most specific WCAG tag
  const rule = tags.find(t => t.startsWith('wcag')) || 'best-practice';
  // Check if mapping exists and has a standard property
  return (wcagMap[rule] && wcagMap[rule].standard) ? wcagMap[rule].standard : 'WCAG 2.1';
};

module.exports = { getUserImpact, getWcagRule };