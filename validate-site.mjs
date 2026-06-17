import fs from 'node:fs/promises';

const requiredHtmlMarkers = [
  'class="topbar-links"',
  'GitHub',
  'Blog',
  'Thoughts',
  'Bilibili',
  'Email',
  'id="workspace"',
  'id="terminal"',
  'id="reader"',
  'id="reader-body"',
  'commandInput.className = "terminal-input"',
  'type <span class="kbd">help</span> and press <span class="kbd">Enter</span>',
  'Last login:',
  'open post <id>',
  'open repo <id>',
  'function openPost',
  'function openRepo',
  'const links',
  'const commands'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const html = await fs.readFile('index.html', 'utf8');

  for (const marker of requiredHtmlMarkers) {
    assert(html.includes(marker), `index.html missing marker: ${marker}`);
  }

  console.log('site validation passed');
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
