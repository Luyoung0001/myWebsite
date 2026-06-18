# Luyoung shell

Low-key static shell page for `luliang.online`.

目标: 简洁操作。用接近真实 shell 的方式浏览文章、项目、搜索结果和站点入口。

顶部支持三态主题切换: `dark` / `light` / `follow browser`.
顶部导航按 `Blog` / `Tools` / `Education` 分组，下拉展示站点入口。

## Links

- Home: https://luliang.online/
- GitHub: https://github.com/Luyoung0001
- Blog: https://blogs.luliang.online/
- Thoughts: https://thoughts.luliang.online/
- Bilibili: https://space.bilibili.com/19872805
- Email: mailto:791975457@qq.com
- PicCut: https://piccut.luliang.online/ - 图片简单剪辑
- Invest: https://invest.luliang.online/ - 黄金、比特币等行情多空判断
- Skills: https://skills.luliang.online/
- SmartChat: https://smartchat.site/ - 智能聊天站点
- AI: https://luyoungai.asia/ - AI 中转站
- XUPTArch: https://xuptarch.com/ - 硬件学习网站
- RSimu: https://rsimu.xuptarch.com/

## Commands

```bash
npm install
npm run start
npm run validate
```

Open `http://localhost:4173/` after starting the server.

Inside the shell:

```bash
cat README
ls links
games
snake
2048
mario
neofetch
jslinux
posts
repos
github search riscv
google riscv
open post 0
open repo 0
web open 0
close
```

`neofetch` now reads browser-side environment data when available, including browser, engine, platform, timezone, screen, viewport, CPU cores, memory hint, network hint, and WebGL GPU renderer. It cannot read the real host computer name from a normal browser page.
