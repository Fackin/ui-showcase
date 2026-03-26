import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-background-secondary shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              UI Showcase
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-4">
              <Link to="/" className="text-text-secondary hover:text-text-primary transition">首页</Link>
              <Link to="/demos" className="text-text-secondary hover:text-text-primary transition">所有Demo</Link>
            </nav>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-background-tertiary text-text-secondary hover:bg-background-hover transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};