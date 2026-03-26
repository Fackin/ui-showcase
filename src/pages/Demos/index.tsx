import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { DemoContainer } from '../../components/DemoContainer';
import { loadAllDemos, Demo } from '../../utils/demoLoader';
import { useBookmarks } from '../../contexts/BookmarkContext';

export const DemosPage = () => {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [filteredDemos, setFilteredDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { bookmarks } = useBookmarks();
  
  const tagFilter = searchParams.get('tag');
  const filterType = searchParams.get('filter');
  
  useEffect(() => {
    loadAllDemos().then(allDemos => {
      setDemos(allDemos);
      setLoading(false);
    });
  }, []);
  
  useEffect(() => {
    let filtered = demos;
    
    if (category) {
      filtered = filtered.filter(d => d.category === category);
    }

    if (tagFilter) {
      filtered = filtered.filter(d => d.tags.includes(tagFilter));
    }

    if (filterType === 'bookmarked') {
      filtered = filtered.filter(d => bookmarks.includes(d.id));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredDemos(filtered);
  }, [demos, category, searchTerm, tagFilter, filterType, bookmarks]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
      </div>
    );
  }
  
  const getPageTitle = () => {
    if (filterType === 'bookmarked') return '我的收藏';
    if (tagFilter) return `标签: #${tagFilter}`;
    if (category) return `${category} 效果`;
    return '所有 Demo';
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-text-primary transition-colors">
          {getPageTitle()}
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="搜索 Demo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 border border-border-primary rounded-lg bg-background-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-colors"
          />
          <div className="text-sm text-text-secondary self-center">
            共 {filteredDemos.length} 个 Demo
          </div>
        </div>
      </div>
      
      {/* Demos */}
      {filteredDemos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-text-secondary">没有找到相关 Demo</p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredDemos.map(demo => (
            <DemoContainer key={demo.id} demo={demo} />
          ))}
        </div>
      )}
    </div>
  );
};