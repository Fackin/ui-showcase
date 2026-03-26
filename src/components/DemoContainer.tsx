import { useEffect, useRef, useState } from 'react';
import { Demo } from '../utils/demoLoader';
import { CodeViewer } from './CodeViewer';
import { useBookmarks } from '../contexts/BookmarkContext';
import { 
  HeartIcon as HeartOutline, 
  ArrowDownTrayIcon, 
  DevicePhoneMobileIcon, 
  DeviceTabletIcon, 
  ComputerDesktopIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface DemoContainerProps {
  demo: Demo;
}

type ViewMode = 'mobile' | 'tablet' | 'desktop';

const viewWidths: Record<ViewMode, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

export const DemoContainer = ({ demo }: DemoContainerProps) => {
  const [showCode, setShowCode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [perf, setPerf] = useState<{ fps: number; memory?: number }>({ fps: 0 });
  const [showPerf, setShowPerf] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const handleExport = () => {
    const fullHtml = generateFullHtml(false); // Export without perf monitor
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${demo.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateFullHtml = (withPerf = true) => {
    const perfScript = withPerf ? `
      <script>
        let frameCount = 0;
        let lastTime = performance.now();
        function updateFPS() {
          const now = performance.now();
          frameCount++;
          if (now - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (now - lastTime));
            const memory = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : undefined;
            window.parent.postMessage({ type: 'perf', fps, memory }, '*');
            frameCount = 0;
            lastTime = now;
          }
          requestAnimationFrame(updateFPS);
        }
        requestAnimationFrame(updateFPS);
      </script>
    ` : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${demo.name}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              overflow: hidden;
            }
            ${demo.css || ''}
          </style>
        </head>
        <body>
          ${demo.html}
          <script>${demo.js || ''}</script>
          ${perfScript}
        </body>
      </html>
    `;
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'perf') {
        setPerf({ fps: event.data.fps, memory: event.data.memory });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!iframeRef.current) return;
    
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    
    const fullHtml = generateFullHtml(true);
    
    doc.open();
    doc.write(fullHtml);
    doc.close();
  }, [demo]);
  
  return (
    <div className="bg-background-secondary rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-border-primary px-6 py-4 bg-gradient-to-r from-background-secondary to-background-tertiary">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-text-primary">{demo.name}</h2>
              <button
                onClick={() => toggleBookmark(demo.id)}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  isBookmarked(demo.id) 
                    ? 'text-red-500 bg-red-500/10' 
                    : 'text-text-tertiary hover:text-red-500 hover:bg-red-500/10'
                }`}
              >
                {isBookmarked(demo.id) ? (
                  <HeartSolid className="w-6 h-6" />
                ) : (
                  <HeartOutline className="w-6 h-6" />
                )}
              </button>
            </div>
            <p className="text-text-secondary mt-1">{demo.description}</p>
            <div className="flex gap-2 mt-3">
              {demo.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-accent-subtle text-accent-text text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPerf(!showPerf)}
              title="运行性能监控"
              className={`p-2 rounded-lg transition-all duration-200 ${
                showPerf 
                  ? 'bg-orange-500/10 text-orange-500' 
                  : 'bg-background-tertiary text-text-secondary hover:bg-background-hover'
              }`}
            >
              <CpuChipIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleExport}
              title="导出为HTML"
              className="p-2 bg-background-tertiary text-text-secondary rounded-lg hover:bg-background-hover transition-all duration-200"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                         transition-all duration-200 text-sm font-medium"
            >
              {showCode ? '隐藏代码' : '查看代码'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Preview */}
      <div className="p-6 bg-gradient-to-br from-background-primary to-background-tertiary">
        <div className="flex justify-center mb-4">
          <div className="flex bg-background-secondary p-1 rounded-lg shadow-sm border border-border-primary">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-md transition ${viewMode === 'mobile' ? 'bg-accent-secondary text-accent-primary' : 'text-text-tertiary hover:text-text-primary'}`}
              title="移动端 (375px)"
            >
              <DevicePhoneMobileIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-1.5 rounded-md transition ${viewMode === 'tablet' ? 'bg-accent-secondary text-accent-primary' : 'text-text-tertiary hover:text-text-primary'}`}
              title="平板 (768px)"
            >
              <DeviceTabletIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-md transition ${viewMode === 'desktop' ? 'bg-accent-secondary text-accent-primary' : 'text-text-tertiary hover:text-text-primary'}`}
              title="桌面端 (100%)"
            >
              <ComputerDesktopIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto transition-all duration-300 overflow-hidden rounded-lg shadow-inner bg-background-secondary" 
             style={{ width: viewWidths[viewMode] }}>
          <div className="border-b border-border-primary px-4 py-2 bg-background-tertiary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-xs text-text-tertiary ml-2">预览</span>
            </div>
            {showPerf && (
              <div className="flex items-center gap-3 text-[10px] font-mono text-text-tertiary">
                <span className={perf.fps < 30 ? 'text-red-500' : perf.fps < 50 ? 'text-yellow-500' : 'text-green-500'}>
                  FPS: {perf.fps}
                </span>
                {perf.memory && (
                  <span>MEM: {perf.memory}MB</span>
                )}
              </div>
            )}
          </div>
          <iframe
            ref={iframeRef}
            title={demo.name}
            className="w-full h-[500px] border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
      
      {/* Code */}
      {showCode && (
        <div className="border-t border-border-primary">
          <div className="p-4 bg-gradient-to-br from-background-primary to-background-tertiary">
            <div className="mb-6">
              <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                <span className="text-orange-400">{'<'}</span>
                HTML
                <span className="text-orange-400">{'>'}</span>
              </h3>
              <CodeViewer code={demo.html} language="html" />
            </div>
            
            {demo.css && (
              <div className="mb-6">
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-400">{'{'}</span>
                  CSS
                  <span className="text-blue-400">{'}'}</span>
                </h3>
                <CodeViewer code={demo.css} language="css" />
              </div>
            )}
            
            {demo.js && (
              <div>
                <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">{'{}'}</span>
                  JavaScript
                </h3>
                <CodeViewer code={demo.js} language="javascript" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};