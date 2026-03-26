# UI Showcase - 前端效果实验室

一个可扩展的UI效果展示平台，支持快速添加HTML/CSS/JS Demo。

## 特性

- 🚀 自动发现Demo，无需手动配置
- 📦 支持HTML/CSS/JS独立文件
- 🎨 隔离渲染，互不干扰
- 💻 代码高亮展示，一键复制
- 📱 响应式设计

## 快速开始

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

### 添加新Demo
\`\`\`bash
# 使用脚本创建模板
npm run create-demo my-demo-name category

# 示例
npm run create-demo gradient-button buttons
\`\`\`

### 手动添加
1. 在 `src/demos/{category}/{demo-name}/` 创建目录
2. 添加 `index.html`, `style.css`, `script.js`
3. 可选添加 `meta.json` 配置元数据
4. 刷新页面即可看到新Demo

## 项目结构

\`\`\`
src/
├── demos/           # Demo存放目录（核心）
│   ├── buttons/     # 按钮效果
│   ├── loadings/    # 加载动画
│   └── images/      # 图片处理
├── components/      # 公共组件
├── pages/           # 页面
├── utils/           # 工具函数
└── styles/          # 全局样式
\`\`\`

## 部署

### Vercel
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Netlify
\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand

## License

MIT