export interface Demo {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  html: string;
  css?: string;
  js?: string;
  previewImage?: string;
  meta: any;
}

// 获取所有Demo
export async function loadAllDemos(): Promise<Demo[]> {
  // 使用 Vite 的 import.meta.glob 动态导入
  const htmlModules = import.meta.glob('/src/demos/**/*.html', { 
    as: 'raw',
    eager: false 
  });
  
  const cssModules = import.meta.glob('/src/demos/**/*.css', { 
    as: 'raw',
    eager: false 
  });
  
  const jsModules = import.meta.glob('/src/demos/**/*.js', { 
    as: 'raw',
    eager: false 
  });
  
  const metaModules = import.meta.glob('/src/demos/**/*.json', { 
    eager: false 
  });
  
  const demos: Demo[] = [];
  
  for (const [path, importFn] of Object.entries(htmlModules)) {
    // 解析路径: /src/demos/buttons/example-button/index.html
    const pathParts = path.split('/');
    if (pathParts.length < 5) continue;
    
    const category = pathParts[3];
    const demoName = pathParts[4];
    const demoId = `${category}/${demoName}`;
    const baseDir = pathParts.slice(0, -1).join('/');
    
    try {
      // 加载HTML
      const html = await importFn() as string;
      
      // 加载CSS
      let css = '';
      const cssPath = `${baseDir}/style.css`;
      if (cssModules[cssPath]) {
        css = await cssModules[cssPath]() as string;
      }
      
      // 加载JS
      let js = '';
      const jsPath = `${baseDir}/script.js`;
      if (jsModules[jsPath]) {
        js = await jsModules[jsPath]() as string;
      }
      
      // 加载meta
      let meta = {};
      const metaPath = `${baseDir}/meta.json`;
      if (metaModules[metaPath]) {
        const metaModule = await metaModules[metaPath]();
        meta = (metaModule as any).default || metaModule;
      }
      
      demos.push({
        id: demoId,
        category,
        name: (meta as any).name || demoName,
        description: (meta as any).description || '',
        tags: (meta as any).tags || [],
        html,
        css,
        js,
        meta,
      });
    } catch (error) {
      console.error(`Failed to load demo: ${path}`, error);
    }
  }
  
  return demos;
}

// 按分类获取
export async function getDemosByCategory(): Promise<Map<string, Demo[]>> {
  const allDemos = await loadAllDemos();
  const categorized = new Map<string, Demo[]>();
  
  allDemos.forEach(demo => {
    if (!categorized.has(demo.category)) {
      categorized.set(demo.category, []);
    }
    categorized.get(demo.category)!.push(demo);
  });
  
  return categorized;
}