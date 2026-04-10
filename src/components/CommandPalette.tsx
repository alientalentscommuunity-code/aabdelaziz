import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, FileText, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface SearchResult {
  id: string;
  type: 'blog' | 'vision';
  title: string;
  description?: string;
  category: string;
  path: string;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Keyboard shortcut: CMD+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    try {
      // Search blog posts
      const { data: blogPosts } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, category, slug, privacy')
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        .eq('privacy', 'public')
        .limit(5);

      if (blogPosts) {
        blogPosts.forEach(post => {
          searchResults.push({
            id: post.id,
            type: 'blog',
            title: post.title,
            description: post.excerpt,
            category: post.category,
            path: `/blog#${post.slug}`,
          });
        });
      }

      // Search vision board items
      const { data: visionItems } = await supabase
        .from('vision_board_items')
        .select('id, title, description, category, privacy')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .eq('privacy', 'public')
        .limit(5);

      if (visionItems) {
        visionItems.forEach(item => {
          searchResults.push({
            id: item.id,
            type: 'vision',
            title: item.title,
            description: item.description || undefined,
            category: item.category,
            path: `/vision-board`,
          });
        });
      }

      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          handleSelect(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (result: SearchResult) => {
    // Save to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recent_searches', JSON.stringify(newRecent));

    navigate(result.path);
    setIsOpen(false);
    setQuery('');
  };

  const quickLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Human Side', path: '/human', icon: '👤' },
    { name: 'Career Side', path: '/career', icon: '💼' },
    { name: 'Vision Board', path: '/vision-board', icon: '🎯' },
    { name: 'Blog', path: '/blog', icon: '📝' },
    { name: 'Sweet Spice', path: '/sweet-spice', icon: '💖' },
    { name: 'Partners', path: '/partners', icon: '🤝' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search className="w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search blog posts, vision items, or navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-lg font-light"
            autoFocus
          />
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="px-2 py-1 bg-white/10 rounded">ESC</span>
            <span>to close</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium uppercase tracking-wider text-white/40 px-3 py-2">
                Search Results
              </div>
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                    selectedIndex === index 
                      ? 'bg-[#00FFA3]/10 border border-[#00FFA3]/30' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  {result.type === 'blog' ? (
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{result.title}</p>
                    {result.description && (
                      <p className="text-sm text-white/40 truncate">{result.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-white/30 uppercase">{result.type}</span>
                  <ArrowRight className="w-4 h-4 text-white/20" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Links */}
          {!query && (
            <div className="p-2">
              <div className="text-xs font-medium uppercase tracking-wider text-white/40 px-3 py-2">
                Quick Navigation
              </div>
              <div className="grid grid-cols-2 gap-1">
                {quickLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-white/5 transition-all"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-white/80">{link.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2 border-t border-white/10">
              <div className="text-xs font-medium uppercase tracking-wider text-white/40 px-3 py-2">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/5 transition-all text-white/60"
                >
                  <Search className="w-4 h-4" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-white/10 rounded">↑↓</span>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-white/10 rounded">↵</span>
              Select
            </span>
          </div>
          <p className="text-xs text-white/30">
            {results.length} results
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
