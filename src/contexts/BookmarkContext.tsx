import React, { createContext, useContext, useEffect, useState } from 'react';

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (demoId: string) => void;
  isBookmarked: (demoId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (demoId: string) => {
    setBookmarks(prev => 
      prev.includes(demoId) 
        ? prev.filter(id => id !== demoId) 
        : [...prev, demoId]
    );
  };

  const isBookmarked = (demoId: string) => bookmarks.includes(demoId);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
