#!/usr/bin/env node
/**
 * BroodhillsGlobal — Lighthouse Audit Runner
 * Runs audits against key pages and outputs a report
 *
 * Install:
 *   npm install -g lighthouse chrome-launcher
 *
 * Usage:
 *   node lighthouse-audit.js
 *   node lighthouse-audit.js --url https://www.broodhillsglobal.com --output ./reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────
const BASE_URL = process.argv[3] || 'https://www.broodhillsglobal.com';
const OUTPUT_DIR = process.argv[5] || './lighthouse-reports';
const THRESHOLDS = {
  performance:       90,
  accessibility:     90,
  'best-practices':  90,
  seo:               90,
};

const PAGES_TO_AUDIT = [
  { name: 'home',    path: '/' },
  { name: 'about',   path: '/about' },
  { name: 'contact', path: '/contact' },
  // Add more pages as needed
];

// ── Utilities ─────────────────────────────────────────────
function coloured(text, code) {
  return `\x1b[${code}m${text}\x1b[0m`;
}
const green  = t => coloured(t, 32);
const red    = t => coloured(t, 31);
const yellow = t => coloured(t, 33);
const bold   = t => coloured(t, 1);
const dim    = t => coloured(t, 2);

function scoreIcon(score, threshold) {
  if (score >= threshold) return green('✓');
  if (score >= threshold - 10) return yellow('⚠');
  return red('✗');
}

// ── Run Lighthouse ─────────────────────────────────────────
function runLighthouse(url, outputPath) {
  const cmd = [
    'lighthouse',
    `"${url}"`,
    '--output=json',
    `--output-path="${outputPath}"`,
    '--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"',
    '--quiet',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--form-factor=desktop',  // Run desktop; change to 'mobile' for mobile audit
  ].join(' ');

  execSync(cmd, { stdio: 'inherit' });
  return JSON.parse(fs.readFileSync(outputPath, 'utf8'));
}

// ── Parse Results ─────────────────────────────────────────
function parseResults(report) {
  const categories = report.lhr?.categories || report.categories;
  const scores = {};
  for (const [key, val] of Object.entries(categories)) {
    scores[key] = Math.round(val.score * 100);
  }

  // Extract key metrics
  const audits = report.lhr?.audits || report.audits;
  const metrics = {
    FCP:  audits['first-contentful-paint']?.displayValue || 'N/A',
    LCP:  audits['largest-contentful-paint']?.displayValue || 'N/A',
    TBT:  audits['total-blocking-time']?.displayValue || 'N/A',
    CLS:  audits['cumulative-layout-shift']?.displayValue || 'N/A',
    SI:   audits['speed-index']?.displayValue || 'N/A',
    TTI:  audits['interactive']?.displayValue || 'N/A',
  };

  // Failed audits
  const failures = [];
  for (const [id, audit] of Object.entries(audits)) {
    if (audit.score !== null && audit.score < 0.9 && audit.score !== 1) {
      failures.push({ id, title: audit.title, score: Math.round(audit.score * 100) });
    }
  }
  failures.sort((a, b) => a.score - b.score);

  return { scores, metrics, failures: failures.slice(0, 10) };
}

// ── Print Report ──────────────────────────────────────────
function printReport(pageName, url, { scores, metrics, failures }) {
  console.log('\n' + bold('═'.repeat(60)));
  console.log(bold(` Page: ${pageName.toUpperCase()}`));
  console.log(dim(` URL: ${url}`));
  console.log(bold('═'.repeat(60)));

  let passed = true;
  for (const [cat, threshold] of Object.entries(THRESHOLDS)) {
    const score = scores[cat] ?? 'N/A';
    const icon = scoreIcon(score, threshold);
    const label = cat.replace(/-/g, ' ').padEnd(18);
    const scoreStr = String(score).padStart(3);
    const bar = '█'.repeat(Math.round(score / 5)).padEnd(20);
    console.log(` ${icon} ${label} ${scoreStr}/100  ${dim(bar)}`);
    if (score < threshold) passed = false;
  }

  console.log('\n Core Web Vitals:');
  console.log(`   FCP: ${metrics.FCP}   LCP: ${metrics.LCP}   CLS: ${metrics.CLS}`);
  console.log(`   TBT: ${metrics.TBT}   SI:  ${metrics.SI}   TTI: ${metrics.TTI}`);

  if (failures.length > 0) {
    console.log('\n Top opportunities to improve:');
    for (const f of failures) {
      const icon = f.score < 50 ? red('✗') : yellow('⚠');
      console.log(`   ${icon} [${String(f.score).padStart(3)}] ${f.title}`);
    }
  }

  return passed;
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(bold('\n🔦 BroodhillsGlobal Lighthouse Audit'));
  console.log(dim(`   Base URL: ${BASE_URL}`));
  console.log(dim(`   Thresholds: Performance ${THRESHOLDS.performance}+, Accessibility ${THRESHOLDS.accessibility}+, BP ${THRESHOLDS['best-practices']}+, SEO ${THRESHOLDS.seo}+\n`));

  const results = [];
  let allPassed = true;

  for (const page of PAGES_TO_AUDIT) {
    const url = `${BASE_URL}${page.path}`;
    const outputPath = path.join(OUTPUT_DIR, `${page.name}-${Date.now()}.json`);

    console.log(dim(`Running audit: ${url}...`));

    try {
      const report = runLighthouse(url, outputPath);
      const parsed = parseResults(report);
      const passed = printReport(page.name, url, parsed);
      results.push({ page: page.name, url, ...parsed, passed });
      if (!passed) allPassed = false;
    } catch (err) {
      console.error(red(`  ✗ Failed to audit ${url}: ${err.message}`));
      results.push({ page: page.name, url, error: err.message, passed: false });
      allPassed = false;
    }
  }

  // Summary
  console.log('\n' + bold('═'.repeat(60)));
  console.log(bold(' SUMMARY'));
  console.log(bold('═'.repeat(60)));
  for (const r of results) {
    const icon = r.passed ? green('✓') : red('✗');
    console.log(` ${icon} ${r.page.padEnd(20)} ${r.passed ? green('PASSED') : red('FAILED')}`);
  }

  const htmlReport = generateHTMLSummary(results);
  const htmlPath = path.join(OUTPUT_DIR, 'summary.html');
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`\n📊 HTML summary saved to: ${htmlPath}`);

  process.exit(allPassed ? 0 : 1);
}

function generateHTMLSummary(results) {
  const rows = results.map(r => `
    <tr>
      <td>${r.page}</td>
      <td>${r.url}</td>
      ${['performance','accessibility','best-practices','seo'].map(cat => {
        const score = r.scores?.[cat] ?? 'ERR';
        const color = score >= 90 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
        return `<td style="color:${color};font-weight:700">${score}</td>`;
      }).join('')}
      <td>${r.passed ? '✅' : '❌'}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>BroodhillsGlobal Lighthouse Summary</title>
<style>
  body { font-family: system-ui; background: #0f1117; color: #e8eaf0; padding: 32px; }
  h1 { font-size: 24px; margin-bottom: 24px; }
  table { width: 100%; border-collapse: collapse; background: #1a1d27; border-radius: 12px; overflow: hidden; }
  th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.07); }
  th { background: rgba(255,255,255,0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #8b8fa8; }
  tr:last-child td { border-bottom: none; }
  td:nth-child(n+3):nth-child(-n+6) { text-align: center; font-size: 18px; }
  .generated { margin-top: 16px; font-size: 12px; color: #8b8fa8; }
</style>
</head>
<body>
<h1>🔦 BroodhillsGlobal — Lighthouse Audit Summary</h1>
<table>
  <thead><tr><th>Page</th><th>URL</th><th>Performance</th><th>Accessibility</th><th>Best Practices</th><th>SEO</th><th>Status</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<p class="generated">Generated: ${new Date().toLocaleString()}</p>
</body>
</html>`;
}

main().catch(console.error);
