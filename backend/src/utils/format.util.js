/**
 * Formats Axe raw output into the strict API response structure.
 */
const { getUserImpact, getWcagRule } = require('./wcagMap.util');

const formatViolations = (axeViolations) => {
  const issues = [];

  axeViolations.forEach((violation) => {
    // Axe groups by rule, but contains multiple nodes (instances).
    // For the summary, we extract the first relevant node or map the rule generally.
    
    violation.nodes.forEach((node, index) => {
      // Limit to first 3 instances per rule to prevent payload explosion
      if (index > 2) return; 

      issues.push({
        id: violation.id,
        impact: violation.impact || 'moderate',
        wcag_rule: `${getWcagRule(violation.tags)} (${violation.id})`,
        affected_users: getUserImpact(violation.tags),
        description: violation.help,
        // These fields will be populated by AI later
        explanation: "Analysis pending...",
        fix_code: "",
        // Internal use for AI context
        _html_context: node.html, 
        _failure_summary: node.failureSummary
      });
    });
  });

  return issues;
};

module.exports = { formatViolations };