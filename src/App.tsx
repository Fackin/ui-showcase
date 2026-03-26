import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Home } from './pages/Home';
import { DemosPage } from './pages/Demos';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookmarkProvider } from './contexts/BookmarkContext';

function AppContent() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300">
      <Header />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demos/:category?" element={<DemosPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </BookmarkProvider>
    </ThemeProvider>
  );
}

export default App;