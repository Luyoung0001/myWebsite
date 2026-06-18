import fs from 'node:fs/promises';

const requiredHtmlMarkers = [
  'class="topbar-links"',
  'class="theme-toggle"',
  'class="menu-group"',
  'class="menu-panel"',
  'const topbarGroups',
  'data-theme-mode="dark"',
  'data-theme-mode="light"',
  'data-theme-mode="system"',
  'GitHub',
  'Blog',
  'Thoughts',
  'Bilibili',
  'Email',
  'PicCut',
  'Invest',
  'Skills',
  'SmartChat',
  'XUPTArch',
  'RSimu',
  'https://luliang.online/',
  'https://blogs.luliang.online/',
  'https://thoughts.luliang.online/',
  'https://piccut.luliang.online/',
  'https://invest.luliang.online/',
  'https://skills.luliang.online/',
  'https://smartchat.site/',
  'https://luyoungai.asia/',
  'https://xuptarch.com/',
  'https://rsimu.xuptarch.com/',
  'https://minillm.xuptarch.com/',
  'https://minicompi.xuptarch.com/',
  'id="workspace"',
  'class="terminal-frame"',
  'static-caret',
  'terminal.innerHTML = ""',
  'class="window-bar"',
  'id="terminal"',
  'guest@luliang.online',
  'id="reader"',
  'id="reader-body"',
  'commandInput.className = "terminal-input"',
  'inputMirror.className = "input-mirror"',
  'function updateInputMirror',
  'function setLoginStatus',
  'const PAGE_SIZE = 10',
  'type <span class="kbd">help</span> and press <span class="kbd">Enter</span>',
  'Last login:',
  'function formatBeijingTime',
  'function applyTheme',
  'function highlightCommandLine',
  'function appendHelp',
  'cmd-command',
  'help-command',
  'open post <id>',
  'open repo <id>',
  'repos / gitrepo',
  'github search <q>',
  'web search <q>',
  'web engine [name]',
  'google <q>',
  'bing <q>',
  'jslinux',
  'author',
  'games',
  'snake',
  '2048',
  'mario',
  'neofetch',
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
  'const AUTHOR_PROFILE',
  'function renderAuthor',
  'function launchSnake',
  'function launch2048',
  'function launchMario',
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
