import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Calendar, Lock, Globe, Users, 
  ChevronDown, ChevronUp, Trash2, Edit2, Save, X,
  Heart, Briefcase, Sparkles, Zap, Image, Video, Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: 'human' | 'career' | 'sweet-spice' | 'universe';
  tags: string[];
  cover_image: string | null;
  media_urls: string[];
  privacy: 'private' | 'shared' | 'public';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const categoryConfig = {
  human: { label: 'Human', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  career: { label: 'Career', icon: Briefcase, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  'sweet-spice': { label: 'Sweet Spice', icon: Sparkles, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  universe: { label: 'Universe', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
};

const privacyConfig = {
  private: { label: 'Private', icon: Lock, color: 'text-red-400' },
  shared: { label: 'Shared', icon: Users, color: 'text-blue-400' },
  public: { label: 'Public', icon: Globe, color: 'text-green-400' },
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPrivacy, setFilterPrivacy] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'universe' as BlogPost['category'],
    privacy: 'private' as BlogPost['privacy'],
    tags: [] as string[],
    cover_image: '',
    media_urls: [] as string[],
    published_at: '',
  });

  const [newTag, setNewTag] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  useEffect(() => {
    fetchPosts();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleCreate = async () => {
    try {
      const slug = generateSlug(formData.title);
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: formData.title,
          slug: slug,
          excerpt: formData.excerpt || null,
          content: formData.content,
          category: formData.category,
          privacy: formData.privacy,
          tags: formData.tags,
          cover_image: formData.cover_image || null,
          media_urls: formData.media_urls,
          published_at: formData.published_at || null,
        })
        .select()
        .single();

      if (error) throw error;

      setIsCreating(false);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingPost) return;

    try {
      const slug = generateSlug(formData.title);
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: formData.title,
          slug: slug,
          excerpt: formData.excerpt || null,
          content: formData.content,
          category: formData.category,
          privacy: formData.privacy,
          tags: formData.tags,
          cover_image: formData.cover_image || null,
          media_urls: formData.media_urls,
          published_at: formData.published_at || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPost.id);

      if (error) throw error;

      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'universe',
      privacy: 'private',
      tags: [],
      cover_image: '',
      media_urls: [],
      published_at: '',
    });
    setNewTag('');
    setNewMediaUrl('');
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      category: post.category,
      privacy: post.privacy,
      tags: post.tags || [],
      cover_image: post.cover_image || '',
      media_urls: post.media_urls || [],
      published_at: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : '',
    });
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    setFormData({
      ...formData,
      tags: [...formData.tags, newTag.trim()],
    });
    setNewTag('');
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const addMediaUrl = () => {
    if (!newMediaUrl.trim()) return;
    setFormData({
      ...formData,
      media_urls: [...formData.media_urls, newMediaUrl],
    });
    setNewMediaUrl('');
  };

  const removeMediaUrl = (index: number) => {
    setFormData({
      ...formData,
      media_urls: formData.media_urls.filter((_, i) => i !== index),
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const filteredPosts = posts.filter(post => {
    if (filterCategory !== 'all' && post.category !== filterCategory) return false;
    if (filterPrivacy !== 'all' && post.privacy !== filterPrivacy) return false;
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const renderForm = () => (
    <div className="glass p-6 rounded-2xl mb-8">
      <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">
        {editingPost ? 'Edit Post' : 'New Post'}
      </h3>

      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-white/5 border-white/10 text-lg"
        />

        <Textarea
          placeholder="Excerpt (optional summary)"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="bg-white/5 border-white/10 min-h-[60px]"
        />

        <Textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="bg-white/5 border-white/10 min-h-[200px]"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogPost['category'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="human">Human</option>
              <option value="career">Career</option>
              <option value="sweet-spice">Sweet Spice</option>
              <option value="universe">Universe</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
              Privacy
            </label>
            <select
              value={formData.privacy}
              onChange={(e) => setFormData({ ...formData, privacy: e.target.value as BlogPost['privacy'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="private">Private</option>
              <option value="shared">Shared</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Cover Image URL
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/image.jpg"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
          {formData.cover_image && (
            <img
              src={formData.cover_image}
              alt="Cover preview"
              className="mt-2 w-full h-32 object-cover rounded-lg"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
              className="bg-white/5 border-white/10"
            />
            <Button onClick={addTag} variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
                <button onClick={() => removeTag(index)} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Media URLs */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Media URLs (Images/Videos)
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add image or video URL..."
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addMediaUrl()}
              className="bg-white/5 border-white/10"
            />
            <Button onClick={addMediaUrl} variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.media_urls.map((url, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {url.includes('youtube') || url.includes('vimeo') ? (
                  <Video className="w-4 h-4 text-red-400" />
                ) : (
                  <Image className="w-4 h-4 text-blue-400" />
                )}
                <span className="flex-1 text-white/60 truncate">{url}</span>
                <button onClick={() => removeMediaUrl(index)} className="text-red-400 hover:text-red-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Date */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Publish Date (optional)
          </label>
          <Input
            type="date"
            value={formData.published_at}
            onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
            className="bg-white/5 border-white/10 w-[200px]"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={editingPost ? handleUpdate : handleCreate}
            className="flex-1 bg-orange-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-orange-400"
          >
            <Save className="w-4 h-4 mr-2" />
            {editingPost ? 'Save Changes' : 'Publish Post'}
          </Button>
          <Button
            onClick={() => {
              setIsCreating(false);
              setEditingPost(null);
              resetForm();
            }}
            variant="outline"
            className="border-white/20 text-white/60"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">
              ✦ THE UNIVERSE
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-4">
              Blog
            </h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Thoughts, stories, and everything in between.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-orange-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-orange-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 w-[200px]"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="all" className="bg-black text-white">All Categories</option>
                <option value="human" className="bg-black text-white">Human</option>
                <option value="career" className="bg-black text-white">Career</option>
                <option value="sweet-spice" className="bg-black text-white">Sweet Spice</option>
                <option value="universe" className="bg-black text-white">Universe</option>
              </select>

              {isAdmin && (
                <select
                  value={filterPrivacy}
                  onChange={(e) => setFilterPrivacy(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="all" className="bg-black text-white">All Privacy</option>
                  <option value="private" className="bg-black text-white">Private</option>
                  <option value="shared" className="bg-black text-white">Shared</option>
                  <option value="public" className="bg-black text-white">Public</option>
                </select>
              )}
            </div>
          </div>

          {/* Form */}
          {isAdmin && (isCreating || editingPost) && renderForm()}

          {/* Blog Posts */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-white/40">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✍️</div>
              <p className="text-white/40 mb-2">No posts yet</p>
              <p className="text-white/20 text-sm">Start writing your first blog post</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const CategoryIcon = categoryConfig[post.category].icon;
                const PrivacyIcon = privacyConfig[post.privacy].icon;
                const isExpanded = expandedPost === post.id;

                return (
                  <article
                    key={post.id}
                    className={`glass rounded-2xl overflow-hidden ${categoryConfig[post.category].border} hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-300 flex flex-col`}
                  >
                    {/* Cover Image */}
                    {post.cover_image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg ${categoryConfig[post.category].bg} flex items-center justify-center shrink-0`}>
                          <CategoryIcon className={`w-4 h-4 ${categoryConfig[post.category].color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black italic text-lg leading-tight mb-1">{post.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <span className={`flex items-center gap-1 ${privacyConfig[post.privacy].color}`}>
                              <PrivacyIcon className="w-3 h-3" />
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm text-white/50 mb-3 line-clamp-2">{post.excerpt}</p>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Media Preview */}
                      {post.media_urls && post.media_urls.length > 0 && (
                        <div className="flex items-center gap-2 mb-3 text-xs text-white/40">
                          {post.media_urls.length} media file{post.media_urls.length !== 1 ? 's' : ''}
                        </div>
                      )}

                      {/* Content Preview */}
                      <div className={`text-sm text-white/60 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {post.content}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" /> Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" /> Read More
                            </>
                          )}
                        </button>
                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEdit(post)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-white/40" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
