import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDemosByCategory, loadAllDemos } from '../../utils/demoLoader';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { HeartIcon, TagIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const categoryIcons: Record<string, string> = {
  buttons: '🔘',
  loadings: '⏳',
  images: '🖼️',
  animations: '✨',
};

export const Sidebar = () => {
  const [categories, setCategories] = useState<Array<{ name: string; count: number }>>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { bookmarks } = useBookmarks();
  const location = useLocation();
  
  useEffect(() => {
    getDemosByCategory().then(categorized => {
      const cats = Array.from(categorized.entries()).map(([name, demos]) => ({
        name,
        count: demos.length,
      }));
      setCategories(cats);
    });

    loadAllDemos().then(allDemos => {
      const allTags = new Set<string>();
      allDemos.forEach(demo => {
        demo.tags.forEach(tag => allTags.add(tag));
      });
      setTags(Array.from(allTags).sort());
    });
  }, []);
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background-secondary border-r border-border-primary overflow-y-auto transition-colors duration-300">
      <div className="p-4 space-y-8">
        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4 flex items-center gap-2">
            <Squares2X2Icon className="w-4 h-4" />
            导航
          </h3>
          <nav className="space-y-1">
            <Link
              to="/demos"
              className={`block px-3 py-2 rounded-lg transition ${
                location.pathname === '/demos'
                  ? 'bg-accent-secondary text-accent-primary'
                  : 'text-text-secondary hover:bg-background-hover'
              }`}
            >
              📦 全部 Demo
            </Link>
            
            {bookmarks.length > 0 && (
              <Link
                to="/demos?filter=bookmarked"
                className={`block px-3 py-2 rounded-lg transition flex justify-between items-center ${
                  location.search === '?filter=bookmarked'
                    ? 'bg-red-500/10 text-red-500'
                    : 'text-text-secondary hover:bg-background-hover'
                }`}
              >
                <span className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4" />
                  我的收藏
                </span>
                <span className="text-xs text-text-tertiary">{bookmarks.length}</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4">
            分类
          </h3>
          <nav className="space-y-1">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/demos/${cat.name}`}
                className={`block px-3 py-2 rounded-lg transition flex justify-between items-center ${
                  location.pathname === `/demos/${cat.name}`
                    ? 'bg-accent-secondary text-accent-primary'
                    : 'text-text-secondary hover:bg-background-hover'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{categoryIcons[cat.name] || '📁'}</span>
                  <span className="capitalize">{cat.name}</span>
                </span>
                <span className="text-xs text-text-tertiary">{cat.count}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Tags Cloud */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4 flex items-center gap-2">
              <TagIcon className="w-4 h-4" />
              标签云
            </h3>
            <div className="flex flex-wrap gap-2 px-1">
              {tags.map(tag => (
                <Link
                  key={tag}
                  to={`/demos?tag=${tag}`}
                  className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
                    location.search === `?tag=${tag}`
                      ? 'bg-accent-subtle text-accent-text'
                      : 'bg-background-tertiary text-text-secondary hover:bg-background-hover'
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};