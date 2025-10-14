#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const changelogPath = path.join(cwd, 'CHANGELOG.md');
const approvedDir = path.join(cwd, 'design-docs', 'approved');

const args = process.argv.slice(2);
const newVersionArg = args[0] || '';
const title = args[1] || 'Approved Changes Summary';

function readFile(p) {
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf8');
}

if (!fs.existsSync(changelogPath)) {
  console.error('CHANGELOG.md not found at project root');
  process.exit(1);
}

const content = readFile(changelogPath);
const header = '## 📅 Versiyon Geçmişi';
const headerIdx = content.indexOf(header);
const afterHeaderIdx = headerIdx >= 0 ? headerIdx + header.length : 0;

// Find last version date after the history header
const versionRegex = /### \[[^\]]+\] - (\d{4}-\d{2}-\d{2})/;
const sliceForVersion = content.slice(afterHeaderIdx);
const match = sliceForVersion.match(versionRegex);
const lastDateStr = match ? match[1] : '1970-01-01';
const lastDate = new Date(`${lastDateStr}T00:00:00Z`);

function listFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const files = listFiles(approvedDir);
const changed = files
  .filter(f => /(\.html|\.md|\.json)$/i.test(f))
  .map(f => ({ file: f, stat: fs.statSync(f) }))
  .filter(o => o.stat.mtime > lastDate);

function slugToTitle(slug) {
  return slug
    .split(/[\-_]/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function extractInfo(fullPath) {
  const rel = path.relative(approvedDir, fullPath);
  const parts = rel.split(path.sep);
  const componentSlug = parts[0] || 'unknown';
  const component = slugToTitle(componentSlug);
  const levelPart = parts.find(p => /level-\d+/i.test(p));
  const level = levelPart || 'level-?';
  const base = path.basename(fullPath);
  const varMatch = base.match(/variant-([A-D])/i);
  const variant = varMatch ? varMatch[1].toUpperCase() : '?';
  return { component, level, variant, relPath: rel.replace(/\\/g, '/') };
}

const approvals = new Map(); // component -> Map(level -> Set(variant))
for (const o of changed) {
  const info = extractInfo(o.file);
  if (!approvals.has(info.component)) approvals.set(info.component, new Map());
  const levels = approvals.get(info.component);
  if (!levels.has(info.level)) levels.set(info.level, new Set());
  levels.get(info.level).add(info.variant);
}

function autoIncrementVersion(currentBlock) {
  const semverMatch = currentBlock.match(/\[v?(\d+)\.(\d+)\.(\d+)\]/);
  if (!semverMatch) return 'v0.0.1';
  const major = Number(semverMatch[1]);
  const minor = Number(semverMatch[2]);
  const patch = Number(semverMatch[3]);
  return `v${major}.${minor}.${patch + 1}`;
}

const firstVersionLineMatch = sliceForVersion.match(/### \[[^\]]+\]/);
const currentVersionStr = firstVersionLineMatch ? firstVersionLineMatch[0] : '### [v0.0.0]';
const autoNext = autoIncrementVersion(currentVersionStr);

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
const versionTag = newVersionArg ? newVersionArg.replace(/^v?/, 'v') : autoNext;

let entry = `\n### [${versionTag}] - ${todayStr} - ${title}\n`;
if (approvals.size === 0) {
  entry += `**✅ Onaylananlar**\n- Bu sürüm aralığında yeni onay yok.\n\n`;
} else {
  entry += `**✅ Onaylananlar**\n`;
  for (const [comp, levels] of approvals.entries()) {
    for (const [level, varsSet] of levels.entries()) {
      const vars = Array.from(varsSet).sort().join(', ');
      entry += `- ${comp} — ${level}: Variant(s) ${vars}\n`;
    }
  }
  entry += `\n`;
}
entry += `**🔧 Technical**\n- Bu blok 'design-docs/approved' içeriğinden otomatik derlendi (son sürüm tarihi: ${lastDateStr}).\n\n`;

const insertPos = afterHeaderIdx > 0 ? afterHeaderIdx : 0;
const newContent = content.slice(0, insertPos) + '\n' + entry + content.slice(insertPos);
const updatedContent = newContent.replace(/\*Son güncelleme: \d{4}-\d{2}-\d{2}\*/g, `*Son güncelleme: ${todayStr}*`);

fs.writeFileSync(changelogPath, updatedContent, 'utf8');
console.log(`Changelog updated with ${versionTag}. Approvals found: ${approvals.size}`);