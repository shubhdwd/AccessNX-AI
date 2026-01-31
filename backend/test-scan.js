// test-scan.js
const TEST_URL = "https://lovable.dev/"; 

console.log(`\n🚀 Sending ${TEST_URL} to AccessNX Backend...`);
console.log("⏳ Please wait (Opening browser, scanning & consulting AI)...\n");

fetch('http://localhost:5000/api/scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: TEST_URL })
})
.then(res => res.json())
.then(data => {
  if (data.error) {
    console.error("❌ ERROR:", data.error);
    return;
  }

  console.log("==========================================");
  console.log(`🎯 SCORE: ${data.score} / 100`);
  console.log("==========================================");
  
  console.log("🏷️  BADGES:");
  data.badges.forEach(b => console.log(`   - ${b}`));

  console.log(`\n📋 ISSUES FOUND (${data.issues.length}):`);
  
  data.issues.forEach((issue, index) => {
    console.log(`\n--- Issue #${index + 1}: ${issue.id} ---`);
    console.log(`🗣️  EXPLANATION: ${issue.explanation}`);
    
    // Print the Non-Technical Fix
    if (issue.how_to_fix_editor) {
      console.log(`\n✨ ${issue.how_to_fix_editor.title}`);
      issue.how_to_fix_editor.steps.forEach((step, i) => {
        console.log(`   ${i + 1}. ${step}`);
      });
    }

    // Print the Code Fix
    if (issue.code_fix) {
      console.log(`\n💻 ${issue.code_fix.title}`);
      console.log(`   ${issue.code_fix.snippet}`);
    }
  });

  console.log("\n✅ Test Complete!");
})
.catch(err => console.error("🔥 Connection Failed:", err.message));