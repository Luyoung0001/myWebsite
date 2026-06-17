import fs from 'node:fs/promises';

const requiredHtmlMarkers = [
  'class="topbar-links"',
  'GitHub',
  'Blog',
  'Thoughts',
  'Bilibili',
  'Email',
  'PicCut',
  'Invest',
  'Skills',
  'XUPTArch',
  'RSimu',
  'https://luliang.online/',
  'https://thoughts.luliang.online/',
  'https://piccut.luliang.online/',
  'https://invest.luliang.online/',
  'https://skills.luliang.online/',
  'https://luyoungai.asia/',
  'https://xuptarch.com/',
  'https://rsimu.xuptarch.com/',
  'id="workspace"',
  'id="terminal"',
  'id="reader"',
  'id="reader-body"',
  'commandInput.className = "terminal-input"',
  'const PAGE_SIZE = 10',
  'type <span class="kbd">help</span> and press <span class="kbd">Enter</span>',
  'Last login:',
  'open post <id>',
  'open repo <id>',
  'repos / gitrepo',
  'github search <q>',
  'web search <q>',
  'web engine [name]',
  'google <q>',
  'bing <q>',
  'function loadAllPosts',
  'function loadAllRepos',
  'function searchGitHubRepos',
  'const webSearchProviders',
  'const JINA_READER_BASE',
  'function fetchMarkdownSearch',
  'function parseMarkdownSearchResults',
  'google:',
  'bing:',
  'function webCommand',
  'function githubCommand',
  'function renderPage',
  'function pageFromKeyboard',
  'pagerArmed',
  'function showOops',
  'function openPost',
  'function openRepo',
  'text-decoration: underline',
  'const links',
  'const siteLinks',
  'const shellReadme',
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
