import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadAllDemos } from '../utils/demoLoader';

export const Home = () => {
  const [totalDemos, setTotalDemos] = useState(0);
  
  useEffect(() => {
    loadAllDemos().then(demos => setTotalDemos(demos.length));
  }, []);
  
  const stats = [
    { label: 'Demo总数', value: totalDemos, icon: '🎨' },
    { label: '效果分类', value: 4, icon: '📂' },
    { label: '代码示例', value: totalDemos * 3, icon: '💻' },
    { label: '即拿即用', value: '100%', icon: '⚡' },
  ];
  
  const categories = [
    { name: 'buttons', title: '按钮效果', icon: '🔘', color: 'from-blue-500 to-cyan-500', desc: '炫酷的按钮动效' },
    { name: 'loadings', title: '加载动画', icon: '⏳', color: 'from-purple-500 to-pink-500', desc: '优雅的加载指示器' },
    { name: 'images', title: '图片处理', icon: '🖼️', color: 'from-green-500 to-emerald-500', desc: '专业的图像工具' },
    { name: 'animations', title: '交互动效', icon: '✨', color: 'from-orange-500 to-red-500', desc: '流畅的过渡动画' },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          UI Showcase
        </h1>
        <p className="text-xl text-text-secondary mb-2">
          前端效果实验室 | 收集最炫酷的UI组件
        </p>
        <p className="text-text-tertiary">
          开箱即用的交互效果，助力你的创意开发
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map(stat => (
          <div key={stat.label} className="text-center p-6 bg-background-secondary rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
            <div className="text-text-secondary text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">效果分类</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/demos/${cat.name}`}
              className="group relative overflow-hidden rounded-2xl bg-background-secondary shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="p-6 text-center">
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{cat.title}</h3>
                <p className="text-text-secondary text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Feature */}
      <div className="bg-accent-subtle rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">快速添加你的Demo</h2>
        <p className="text-text-secondary mb-4">
          只需在 demos 目录下创建文件夹，放入 HTML/CSS/JS 文件即可自动展示
        </p>
        <code className="bg-code-background text-code-text px-4 py-2 rounded-lg text-sm">
          npm run create-demo my-button buttons
        </code>
      </div>
    </div>
  );
};