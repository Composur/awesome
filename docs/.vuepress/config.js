const nav = require('./links/nav.js');
module.exports = {
  base: '/awesome/',
  dest: './dist',
  title: 'Awesome-FE',
  description: '个人笔记',
  repo: 'https://github.com/Composur/awesome', // 添加 github 链接
  themeConfig: {
    nav,
    sidebar: 'auto'
  },
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
    extractHeaders: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  }
};
