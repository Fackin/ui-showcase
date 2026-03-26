console.log('按钮Demo已加载');

// 添加点击反馈
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const text = e.currentTarget.querySelector('span')?.innerText || '';
    console.log(`点击了: ${text}`);
    
    // 创建临时提示
    const toast = document.createElement('div');
    toast.textContent = `✨ ${text} ✨`;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      animation: slideIn 0.3s ease;
      z-index: 1000;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 2000);
  });
});

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);