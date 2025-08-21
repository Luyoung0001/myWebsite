import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';

const BASE = 'https://blog.luliang.website';
const START = BASE + '/archives/';
const MAX_PAGES = 1000; // 安全上限，可按需加大

function slugFromUrl(href){
  try{
    const u = new URL(href);
    const segs = u.pathname.split('/').filter(Boolean);
    let last = segs[segs.length-1] || segs[segs.length-2] || 'post';
    last = decodeURIComponent(last)
      .toLowerCase()
      .replace(/[^a-z0-9\-_]+/g,'-')
      .replace(/^-+|-+$/g,'');
    return last || 'post';
  }catch{ return 'post'; }
}

async function collectFrom(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('HTTP '+res.status+' @ '+url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // 1) 抓取文章链接（通用做法：遍历所有 a，筛掉归档页自身）
  const links = new Set();
  $('a').each((_,a)=>{
    const href = $(a).attr('href');
    const text = $(a).text().trim();
    if(!href) return;
    const abs = href.startsWith('http') ? href : BASE + (href.startsWith('/')? href : ('/'+href));
    // 过滤：包含年份 /20xx/，且不是 /archives/... 的链接
    if(/\/20\d{2}\//.test(abs) && !/\/archives\//.test(abs)){
      links.add(JSON.stringify({url:abs, title:text}));
    }
  });

  // 2) 下一页（/archives/page/N）
  let next = null;
  $('a').each((_,a)=>{
    const href = ($(a).attr('href')||'').trim();
    if(/\/archives\/page\/(\d+)\/?$/.test(href)){
      const abs = href.startsWith('http') ? href : BASE + (href.startsWith('/')? href : ('/'+href));
      // 取“最长”的那个作为 next（粗略避免重复）
      if(!next || abs.length > next.length) next = abs;
    }
  });

  return {
    posts: Array.from(links).map(s=>JSON.parse(s)),
    next
  };
}

(async()=>{
  const seen = new Set();
  const out = [];
  let url = START;
  let pages = 0;

  while(url && pages < MAX_PAGES){
    pages++;
    console.log('[crawl]', url);
    const {posts, next} = await collectFrom(url);
    for(const p of posts){
      if(seen.has(p.url)) continue;
      seen.add(p.url);
      const id = slugFromUrl(p.url);
      const title = p.title || id;
      out.push({ id, title, url: p.url });
    }
    if(next && next !== url){
      url = next;
    }else{
      url = null;
    }
  }

  // 按 URL 中 YYYY/MM/DD 降序（粗略）
  out.sort((a,b)=>{
    const ma = a.url.match(/(\d{4})\/(\d{2})\/(\d{2})/);
    const mb = b.url.match(/(\d{4})\/(\d{2})\/(\d{2})/);
    const da = ma ? new Date(ma[1], ma[2]-1, ma[3]) : new Date(0);
    const db = mb ? new Date(mb[1], mb[2]-1, mb[3]) : new Date(0);
    return db - da;
  });

  const payload = { blog: { label: '个人博客', posts: out } };
  await fs.writeFile('posts.json', JSON.stringify(payload, null, 2), 'utf8');
  console.log('done. posts.json =', out.length);
})();
