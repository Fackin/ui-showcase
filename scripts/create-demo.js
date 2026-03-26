import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createDemo = (demoName, category) => {
  const demoPath = path.join(__dirname, '../src/demos', category, demoName);
  
  // 创建目录
  fs.ensureDirSync(demoPath);
  
  // 创建HTML
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${demoName}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>${demoName}</h1>
    <button class="demo-button">点击我</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`;
  
  // 创建CSS
  const css = `.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  font-size: 24px;
  color: #333;
}

.demo-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.demo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.demo-button:active {
  transform: translateY(0);
}`;
  
  // 创建JS
  const js = `document.querySelector('.demo-button')?.addEventListener('click', () => {
  alert('Hello from ${demoName}!');
});`;
  
  // 创建meta
  const meta = {
    name: demoName,
    description: `这是一个${demoName}的Demo示例`,
    category: category,
    tags: ['demo', 'example'],
    date: new Date().toISOString().split('T')[0],
    author: 'Your Name',
    difficulty: 'easy'
  };
  
  // 写入文件
  fs.writeFileSync(path.join(demoPath, 'index.html'), html);
  fs.writeFileSync(path.join(demoPath, 'style.css'), css);
  fs.writeFileSync(path.join(demoPath, 'script.js'), js);
  fs.writeFileSync(path.join(demoPath, 'meta.json'), JSON.stringify(meta, null, 2));
  
  console.log(`✅ Demo "${demoName}" 创建成功！`);
  console.log(`📁 路径: src/demos/${category}/${demoName}`);
  console.log(`\n启动项目后访问: http://localhost:3000/demos/${category}`);
};

// 命令行参数
const args = process.argv.slice(2);
const demoName = args[0];
const category = args[1] || 'uncategorized';

if (!demoName) {
  console.error('请提供Demo名称: npm run create-demo <demo-name> [category]');
  console.error('示例: npm run create-demo gradient-button buttons');
  process.exit(1);
}

createDemo(demoName, category);