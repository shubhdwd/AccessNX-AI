/**
 * Calculates a 0-100 score and generates badges.
 */
const calculateScoreAndBadges = (violations) => {
  let score = 100;
  let criticalCount = 0;
  
  // Scoring Weights
  const weights = {
    critical: 15,
    serious: 8,
    moderate: 4,
    minor: 1
  };

  violations.forEach(v => {
    if (v.impact === 'critical') criticalCount++;
    const deduction = weights[v.impact] || 1;
    score -= deduction;
  });

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  // Generate Badges
  const badges = [];
  
  // Compliance Badge
  if (score >= 90) badges.push("WCAG 2.1 AA – Compliant");
  else if (score >= 70) badges.push("WCAG 2.1 AA – Needs Improvement");
  else badges.push("WCAG 2.1 AA – Non-Compliant");

  // Critical Issues Badge
  if (criticalCount > 0) {
    badges.push(`${criticalCount} Critical Issue${criticalCount > 1 ? 's' : ''}`);
  } else {
    badges.push("No Critical Issues");
  }

  // AI Availability Badge
  badges.push("AI Fixes Available");

  return { score, badges };
};

module.exports = { calculateScoreAndBadges };