import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Inbox, Target, FileText, LayoutGrid, Settings, LogOut, RefreshCw, 
  AlertCircle, Plus, Search, Filter, X, Edit2, Trash2, Eye, 
  CheckCircle, Clock, Archive, Mail, Phone, Building2, ExternalLink,
  ChevronDown, ChevronUp, Save, Globe, Lock, Users, Heart, Briefcase, Sparkles, Zap,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequests, useAuth } from '@/hooks/useSupabase';
import { supabase, Request } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

// Types
interface VisionItem {
  id: string;
  title: string;
  description: string | null;
  category: 'human' | 'career' | 'sweet-spice' | 'universe';
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  target_date: string | null;
  links: string[];
  privacy: 'private' | 'shared' | 'public';
  subtasks: { id: string; title: string; completed: boolean }[];
  created_at: string;
}

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
}

interface UniverseSection {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: string;
  accent: string;
  isActive: boolean;
  order: number;
}

type TabType = 'requests' | 'vision' | 'blog' | 'universe' | 'analytics' | 'sweet-spice';

const statusColors = {
  new: 'bg-green-500/20 text-green-400 border-green-500/30',
  in_review: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  responded: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  archived: 'bg-white/10 text-white/40 border-white/20',
};

const priorityColors = {
  low: 'bg-white/10 text-white/50',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-orange-500/20 text-orange-400',
  urgent: 'bg-red-500/20 text-red-400',
};

const categoryConfig = {
  human: { label: 'Human', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  career: { label: 'Career', icon: Briefcase, color: 'text-green-400', bg: 'bg-green-500/10' },
  'sweet-spice': { label: 'Sweet Spice', icon: Sparkles, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  universe: { label: 'Universe', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

const privacyConfig = {
  private: { label: 'Private', icon: Lock, color: 'text-red-400' },
  shared: { label: 'Shared', icon: Users, color: 'text-blue-400' },
  public: { label: 'Public', icon: Globe, color: 'text-green-400' },
};

const personaLabels: Record<string, string> = {
  peer: 'Peer / Fellow Builder',
  'talent-hunter': 'Talent Hunter / Recruiter',
  vc: 'VC / Investor',
  'co-founder': 'Potential Co-founder',
  educational: 'Educational Institution',
  mentor: 'Mentor',
  mentee: 'Mentee',
  community: 'Community Member',
  other: 'Other',
  'sweet-spice': 'Sweet Spice',
};

// Universe sections data (stored in localStorage for now)
const defaultUniverseSections: UniverseSection[] = [
  { id: '1', name: 'Human Side', path: '/human', description: 'Personal story and journey', icon: 'user', accent: 'white', isActive: true, order: 1 },
  { id: '2', name: 'Career Side', path: '/career', description: 'Professional portfolio and CV', icon: 'briefcase', accent: 'green', isActive: true, order: 2 },
  { id: '3', name: 'Work With Me', path: '/partners', description: 'Partnership opportunities', icon: 'handshake', accent: 'white', isActive: true, order: 3 },
  { id: '4', name: 'Sweet Spice', path: '/sweet-spice', description: 'Personal connection page', icon: 'heart', accent: 'pink', isActive: true, order: 4 },
  { id: '5', name: 'Vision Board', path: '/vision-board', description: 'Dreams and plans', icon: 'target', accent: 'purple', isActive: true, order: 5 },
  { id: '6', name: 'Blog', path: '/blog', description: 'Thoughts and stories', icon: 'file-text', accent: 'purple', isActive: true, order: 6 },
  { id: '7', name: 'Startup Handbook', path: '/handbook', description: 'Resources and guides', icon: 'book', accent: 'orange', isActive: true, order: 7 },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { requests, stats, loading: requestsLoading, error, refetch, updateRequest, deleteRequest, markAsViewed } = useRequests();
  
  // Active tab
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  
  // Universe sections
  const [universeSections, setUniverseSections] = useState<UniverseSection[]>(() => {
    const saved = localStorage.getItem('universe_sections');
    return saved ? JSON.parse(saved) : defaultUniverseSections;
  });

  // Vision Board state
  const [visionItems, setVisionItems] = useState<VisionItem[]>([]);
  const [visionLoading, setVisionLoading] = useState(false);
  const [isCreatingVision, setIsCreatingVision] = useState(false);
  const [editingVision, setEditingVision] = useState<VisionItem | null>(null);
  const [visionForm, setVisionForm] = useState({
    title: '', description: '', category: 'universe' as VisionItem['category'],
    priority: 'medium' as VisionItem['priority'], target_date: '',
    privacy: 'private' as VisionItem['privacy'], links: [] as string[],
    subtasks: [] as { title: string; completed: boolean }[],
  });
  const [newSubtask, setNewSubtask] = useState('');

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', category: 'universe' as BlogPost['category'],
    privacy: 'private' as BlogPost['privacy'], tags: [] as string[],
    cover_image: '', media_urls: [] as string[], published_at: '',
  });
  const [newTag, setNewTag] = useState('');

  // Requests state
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Save universe sections to localStorage
  useEffect(() => {
    localStorage.setItem('universe_sections', JSON.stringify(universeSections));
  }, [universeSections]);

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'vision') fetchVisionItems();
    if (activeTab === 'blog') fetchBlogPosts();
    if (activeTab === 'sweet-spice') fetchSweetSpiceRequests();
  }, [activeTab]);

  // Redirect if not logged in
  if (!user && !requestsLoading) {
    return <Navigate to="/admin" replace />;
  }

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesSearch = 
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      personaLabels[req.persona]?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    if (!request.viewed_at) {
      markAsViewed(request.id);
    }
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    const updates: Partial<Request> = { status: newStatus as any };
    if (newStatus === 'responded') {
      updates.responded_at = new Date().toISOString();
    }
    await updateRequest(requestId, updates);
  };

  const handleDelete = async (requestId: string) => {
    if (confirm('Are you sure you want to delete this request?')) {
      await deleteRequest(requestId);
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(null);
      }
    }
  };

  const getStatsCount = (status: string) => {
    return stats.find(s => s.status === status)?.count || 0;
  };

  // Vision Board Functions
  const fetchVisionItems = async () => {
    setVisionLoading(true);
    try {
      const { data, error } = await supabase
        .from('vision_board_items')
        .select('*, subtasks:vision_board_subtasks(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setVisionItems(data || []);
    } catch (err) {
      console.error('Error fetching vision items:', err);
    } finally {
      setVisionLoading(false);
    }
  };

  const createVisionItem = async () => {
    try {
      const { data, error } = await supabase
        .from('vision_board_items')
        .insert({
          title: visionForm.title, description: visionForm.description,
          category: visionForm.category, priority: visionForm.priority,
          target_date: visionForm.target_date || null, privacy: visionForm.privacy,
          links: visionForm.links, progress: 0, status: 'not-started',
        })
        .select().single();
      if (error) throw error;
      if (visionForm.subtasks.length > 0 && data) {
        await supabase.from('vision_board_subtasks').insert(
          visionForm.subtasks.map(st => ({
            vision_item_id: data.id, title: st.title, completed: st.completed,
          }))
        );
      }
      setIsCreatingVision(false); 
      resetVisionForm(); 
      await fetchVisionItems();
    } catch (err) {
      console.error('Error creating vision item:', err);
      alert('Failed to create vision item. Please try again.');
    }
  };

  const updateVisionItem = async () => {
    if (!editingVision) return;
    try {
      await supabase.from('vision_board_items').update({
        title: visionForm.title, description: visionForm.description,
        category: visionForm.category, priority: visionForm.priority,
        target_date: visionForm.target_date || null, privacy: visionForm.privacy,
        links: visionForm.links, updated_at: new Date().toISOString(),
      }).eq('id', editingVision.id);
      await supabase.from('vision_board_subtasks').delete().eq('vision_item_id', editingVision.id);
      if (visionForm.subtasks.length > 0) {
        await supabase.from('vision_board_subtasks').insert(
          visionForm.subtasks.map(st => ({
            vision_item_id: editingVision.id, title: st.title, completed: st.completed,
          }))
        );
      }
      setEditingVision(null); 
      resetVisionForm(); 
      await fetchVisionItems();
    } catch (err) {
      console.error('Error updating vision item:', err);
      alert('Failed to update vision item. Please try again.');
    }
  };

  const deleteVisionItem = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('vision_board_items').delete().eq('id', id);
      await fetchVisionItems();
    } catch (err) {
      console.error('Error deleting vision item:', err);
      alert('Failed to delete vision item. Please try again.');
    }
  };

  const resetVisionForm = () => {
    setVisionForm({
      title: '', description: '', category: 'universe', priority: 'medium',
      target_date: '', privacy: 'private', links: [], subtasks: [],
    });
    setNewSubtask('');
  };

  // Blog Functions
  const fetchBlogPosts = async () => {
    setBlogLoading(true);
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setBlogLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const createBlogPost = async () => {
    try {
      const { error } = await supabase.from('blog_posts').insert({
        title: blogForm.title, slug: generateSlug(blogForm.title),
        excerpt: blogForm.excerpt || null, content: blogForm.content,
        category: blogForm.category, privacy: blogForm.privacy,
        tags: blogForm.tags, cover_image: blogForm.cover_image || null,
        media_urls: blogForm.media_urls, published_at: blogForm.published_at || null,
      });
      if (error) throw error;
      setIsCreatingBlog(false); 
      resetBlogForm(); 
      await fetchBlogPosts();
    } catch (err) {
      console.error('Error creating blog post:', err);
      alert('Failed to create blog post. Please try again.');
    }
  };

  const updateBlogPost = async () => {
    if (!editingBlog) return;
    try {
      await supabase.from('blog_posts').update({
        title: blogForm.title, slug: generateSlug(blogForm.title),
        excerpt: blogForm.excerpt || null, content: blogForm.content,
        category: blogForm.category, privacy: blogForm.privacy,
        tags: blogForm.tags, cover_image: blogForm.cover_image || null,
        media_urls: blogForm.media_urls, published_at: blogForm.published_at || null,
        updated_at: new Date().toISOString(),
      }).eq('id', editingBlog.id);
      setEditingBlog(null); 
      resetBlogForm(); 
      await fetchBlogPosts();
    } catch (err) {
      console.error('Error updating blog post:', err);
      alert('Failed to update blog post. Please try again.');
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
      await fetchBlogPosts();
    } catch (err) {
      console.error('Error deleting blog post:', err);
      alert('Failed to delete blog post. Please try again.');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '', excerpt: '', content: '', category: 'universe',
      privacy: 'private', tags: [], cover_image: '', media_urls: [], published_at: '',
    });
    setNewTag('');
  };

  // Universe Management Functions
  const toggleSection = (id: string) => {
    setUniverseSections(sections =>
      sections.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
  };

  // Sweet Spice state
  const [sweetSpiceRequests, setSweetSpiceRequests] = useState<any[]>([]);
  const [sweetSpiceLoading, setSweetSpiceLoading] = useState(false);
  const [selectedSweetSpiceRequest, setSelectedSweetSpiceRequest] = useState<any>(null);
  const [sweetSpiceStatusFilter, setSweetSpiceStatusFilter] = useState<string>('all');
  const [generatedCode, setGeneratedCode] = useState('');

  // Fetch Sweet Spice requests
  const fetchSweetSpiceRequests = async () => {
    setSweetSpiceLoading(true);
    try {
      const { data, error } = await supabase
        .from('sweet_spice_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSweetSpiceRequests(data || []);
    } catch (err) {
      console.error('Error fetching sweet spice requests:', err);
    } finally {
      setSweetSpiceLoading(false);
    }
  };

  // Generate access code
  const generateAccessCode = async (requestId: string) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    try {
      await supabase
        .from('sweet_spice_requests')
        .update({
          access_code: code,
          code_expires_at: expiresAt.toISOString(),
          status: 'approved'
        })
        .eq('id', requestId);
      
      setGeneratedCode(code);
      await fetchSweetSpiceRequests();
    } catch (err) {
      console.error('Error generating code:', err);
    }
  };

  // Update Sweet Spice request status
  const updateSweetSpiceStatus = async (requestId: string, status: string) => {
    try {
      await supabase
        .from('sweet_spice_requests')
        .update({ status })
        .eq('id', requestId);
      await fetchSweetSpiceRequests();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Navigation Items
  const navItems = [
    { id: 'requests', label: 'Requests', icon: Inbox, count: getStatsCount('new') },
    { id: 'vision', label: 'Vision Board', icon: Target, count: visionItems.length },
    { id: 'blog', label: 'Blog', icon: FileText, count: blogPosts.length },
    { id: 'universe', label: 'Universe', icon: LayoutGrid, count: null },
    { id: 'sweet-spice', label: 'Sweet Spice', icon: Heart, count: sweetSpiceRequests.filter(r => r.status === 'pending').length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null },
  ];

  if (requestsLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="font-medium italic">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black italic uppercase tracking-tighter text-white">
            ALIEN<span className="text-green-500">S</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-green-500/10 text-green-400 border border-green-500/30" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.count !== null && item.count > 0 && (
                  <span className="ml-auto bg-green-500 text-black text-xs font-black px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="outline"
            onClick={signOut}
            className="w-full border-white/10 text-white/60 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center justify-between h-16 px-8">
            <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">
              {navItems.find(n => n.id === activeTab)?.label}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* REQUESTS TAB */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'New', count: getStatsCount('new'), color: 'green', icon: Inbox },
                  { label: 'In Review', count: getStatsCount('in_review'), color: 'orange', icon: Clock },
                  { label: 'Responded', count: getStatsCount('responded'), color: 'blue', icon: CheckCircle },
                  { label: 'Archived', count: getStatsCount('archived'), color: 'white', icon: Archive },
                ].map(({ label, count, color, icon: Icon }) => (
                  <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-full bg-${color}-500/10 border border-${color}-500/20`}>
                    <Icon className={`w-4 h-4 text-${color}-400`} />
                    <span className={`text-sm font-medium text-${color}-400`}>{count} {label}</span>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/10">
                    <SelectItem value="all" className="text-white">All Requests</SelectItem>
                    <SelectItem value="new" className="text-white">New</SelectItem>
                    <SelectItem value="in_review" className="text-white">In Review</SelectItem>
                    <SelectItem value="responded" className="text-white">Responded</SelectItem>
                    <SelectItem value="archived" className="text-white">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Request List */}
                <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto">
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <Inbox className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40 font-medium italic">No requests found</p>
                    </div>
                  ) : (
                    filteredRequests.map((request) => (
                      <div
                        key={request.id}
                        onClick={() => handleViewRequest(request)}
                        className={cn(
                          "glass p-4 cursor-pointer transition-all duration-300",
                          selectedRequest?.id === request.id ? "border-green-500/50 bg-green-500/5" : "hover:border-white/20",
                          !request.viewed_at && "border-l-2 border-l-green-500"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-white truncate">{request.name}</h3>
                          <Badge variant="outline" className={cn("text-[10px]", statusColors[request.status])}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-white/40 mb-2">{personaLabels[request.persona]}</p>
                        <p className="text-xs text-white/30 truncate">{request.details.slice(0, 60)}...</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Request Detail */}
                <div className="lg:col-span-2">
                  {selectedRequest ? (
                    <div className="glass p-6">
                      <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-white">{selectedRequest.name}</h2>
                            <Badge variant="outline" className={cn("text-xs", statusColors[selectedRequest.status])}>
                              {selectedRequest.status}
                            </Badge>
                            <Badge variant="outline" className={cn("text-xs", priorityColors[selectedRequest.priority])}>
                              {selectedRequest.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/40">{personaLabels[selectedRequest.persona]} • {selectedRequest.purpose}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(selectedRequest.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedRequest(null)} className="border-white/10 text-white/60">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {['new', 'in_review', 'responded', 'archived'].map((status) => (
                          <Button
                            key={status}
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(selectedRequest.id, status)}
                            className={cn("text-xs", selectedRequest.status === status ? statusColors[status as keyof typeof statusColors] : "border-white/10 text-white/40")}
                          >
                            {status.replace('_', ' ')}
                          </Button>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-white/40" />
                          <a href={`mailto:${selectedRequest.email}`} className="text-sm text-white hover:text-green-400">{selectedRequest.email}</a>
                        </div>
                        {selectedRequest.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-white/40" />
                            <a href={`tel:${selectedRequest.phone}`} className="text-sm text-white hover:text-green-400">{selectedRequest.phone}</a>
                          </div>
                        )}
                        {selectedRequest.linkedin && (
                          <div className="flex items-center gap-3">
                            <ExternalLink className="w-4 h-4 text-white/40" />
                            <a href={selectedRequest.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-green-400">LinkedIn</a>
                          </div>
                        )}
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Message</h3>
                        <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{selectedRequest.details}</p>
                      </div>

                      {selectedRequest.file_url && (
                        <div className="mb-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                          <h3 className="text-xs font-black uppercase tracking-widest text-green-400 mb-2">Attachment</h3>
                          <a href={selectedRequest.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300">
                            <ExternalLink className="w-4 h-4" />
                            {selectedRequest.file_name || 'View Attachment'}
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="glass p-12 text-center">
                      <Inbox className="w-16 h-16 text-white/20 mx-auto mb-4" />
                      <p className="text-white/40 font-medium italic">Select a request to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VISION BOARD TAB */}
          {activeTab === 'vision' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button onClick={() => setIsCreatingVision(true)} className="bg-orange-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-orange-400">
                    <Plus className="w-4 h-4 mr-2" />
                    New Vision
                  </Button>
                </div>
                <p className="text-white/40 text-sm">{visionItems.length} visions total</p>
              </div>

              {/* Vision Form */}
              {(isCreatingVision || editingVision) && (
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">{editingVision ? 'Edit Vision' : 'New Vision'}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Title" value={visionForm.title} onChange={(e) => setVisionForm({ ...visionForm, title: e.target.value })} className="bg-white/5 border-white/10" />
                    <Textarea placeholder="Description" value={visionForm.description} onChange={(e) => setVisionForm({ ...visionForm, description: e.target.value })} className="bg-white/5 border-white/10 min-h-[100px]" />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={visionForm.category} onValueChange={(v) => setVisionForm({ ...visionForm, category: v as any })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          {Object.entries(categoryConfig).map(([key, { label }]) => (
                            <SelectItem key={key} value={key} className="text-white">{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={visionForm.priority} onValueChange={(v) => setVisionForm({ ...visionForm, priority: v as any })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          {['low', 'medium', 'high', 'urgent'].map(p => <SelectItem key={p} value={p} className="text-white capitalize">{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="date" value={visionForm.target_date} onChange={(e) => setVisionForm({ ...visionForm, target_date: e.target.value })} className="bg-white/5 border-white/10" />
                      <Select value={visionForm.privacy} onValueChange={(v) => setVisionForm({ ...visionForm, privacy: v as any })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          {Object.entries(privacyConfig).map(([key, { label }]) => (
                            <SelectItem key={key} value={key} className="text-white">{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Subtasks */}
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">Subtasks</label>
                      <div className="flex gap-2 mb-2">
                        <Input placeholder="Add subtask..." value={newSubtask} onChange={(e) => setNewSubtask(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (setVisionForm({...visionForm, subtasks: [...visionForm.subtasks, {title: newSubtask, completed: false}]}), setNewSubtask(''))} className="bg-white/5 border-white/10" />
                        <Button onClick={() => { if(newSubtask) { setVisionForm({...visionForm, subtasks: [...visionForm.subtasks, {title: newSubtask, completed: false}]}); setNewSubtask(''); }}} variant="outline" size="sm"><Plus className="w-4 h-4" /></Button>
                      </div>
                      <div className="space-y-1">
                        {visionForm.subtasks.map((st, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="flex-1 text-white/60">{st.title}</span>
                            <button onClick={() => setVisionForm({...visionForm, subtasks: visionForm.subtasks.filter((_, idx) => idx !== i)})} className="text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="button"
                        onClick={editingVision ? updateVisionItem : createVisionItem} 
                        disabled={!visionForm.title}
                        className="flex-1 bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingVision ? 'Save Changes' : 'Create Vision'}
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => { setIsCreatingVision(false); setEditingVision(null); resetVisionForm(); }} 
                        variant="outline" 
                        className="border-white/20 text-white/60"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Vision Items Grid */}
              {visionLoading ? (
                <div className="text-center py-20">
                  <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-white/40">Loading visions...</p>
                </div>
              ) : visionItems.length === 0 ? (
                <div className="text-center py-20">
                  <Target className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <p className="text-white/40 mb-2">No visions found</p>
                  <p className="text-white/20 text-sm">Create your first vision item</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visionItems.map((item) => {
                    const CategoryIcon = categoryConfig[item.category].icon;
                    const PrivacyIcon = privacyConfig[item.privacy].icon;
                    return (
                      <div key={item.id} className="glass p-6 rounded-2xl hover:border-white/20 transition-all">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-10 h-10 rounded-xl ${categoryConfig[item.category].bg} flex items-center justify-center`}>
                            <CategoryIcon className={`w-5 h-5 ${categoryConfig[item.category].color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black italic text-lg leading-tight mb-1 truncate">{item.title}</h3>
                            <div className="flex items-center gap-2 text-xs">
                              <span className={`flex items-center gap-1 ${privacyConfig[item.privacy].color}`}>
                                <PrivacyIcon className="w-3 h-3" />
                                {privacyConfig[item.privacy].label}
                              </span>
                              <span className="text-white/20">•</span>
                              <span className="text-white/40">{item.priority}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-white/50 mb-4 line-clamp-2">{item.description}</p>
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/40">Progress</span>
                            <span className="text-orange-400 font-black">{item.progress}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/30">{item.subtasks?.length || 0} subtasks</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => { setEditingVision(item); setVisionForm({ title: item.title, description: item.description || '', category: item.category, priority: item.priority, target_date: item.target_date || '', privacy: item.privacy, links: item.links || [], subtasks: item.subtasks || [] }); }} className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-white/40" /></button>
                            <button onClick={() => deleteVisionItem(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* BLOG TAB */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button onClick={() => setIsCreatingBlog(true)} className="bg-orange-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-orange-400">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
                <p className="text-white/40 text-sm">{blogPosts.length} posts total</p>
              </div>

              {/* Blog Form */}
              {(isCreatingBlog || editingBlog) && (
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">{editingBlog ? 'Edit Post' : 'New Post'}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} className="bg-white/5 border-white/10 text-lg" />
                    <Textarea placeholder="Excerpt" value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} className="bg-white/5 border-white/10 min-h-[60px]" />
                    <Textarea placeholder="Content" value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} className="bg-white/5 border-white/10 min-h-[200px]" />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={blogForm.category} onValueChange={(v) => setBlogForm({ ...blogForm, category: v as any })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          {Object.entries(categoryConfig).map(([key, { label }]) => (
                            <SelectItem key={key} value={key} className="text-white">{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={blogForm.privacy} onValueChange={(v) => setBlogForm({ ...blogForm, privacy: v as any })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          {Object.entries(privacyConfig).map(([key, { label }]) => (
                            <SelectItem key={key} value={key} className="text-white">{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Input placeholder="Cover Image URL" value={blogForm.cover_image} onChange={(e) => setBlogForm({ ...blogForm, cover_image: e.target.value })} className="bg-white/5 border-white/10" />
                    {/* Tags */}
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">Tags</label>
                      <div className="flex gap-2 mb-2">
                        <Input placeholder="Add tag..." value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (setBlogForm({...blogForm, tags: [...blogForm.tags, newTag]}), setNewTag(''))} className="bg-white/5 border-white/10" />
                        <Button onClick={() => { if(newTag) { setBlogForm({...blogForm, tags: [...blogForm.tags, newTag]}); setNewTag(''); }}} variant="outline" size="sm"><Plus className="w-4 h-4" /></Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blogForm.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full">
                            {tag}
                            <button onClick={() => setBlogForm({...blogForm, tags: blogForm.tags.filter((_, idx) => idx !== i)})} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="button"
                        onClick={editingBlog ? updateBlogPost : createBlogPost} 
                        disabled={!blogForm.title || !blogForm.content}
                        className="flex-1 bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingBlog ? 'Save Changes' : 'Publish Post'}
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => { setIsCreatingBlog(false); setEditingBlog(null); resetBlogForm(); }} 
                        variant="outline" 
                        className="border-white/20 text-white/60"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Posts Grid */}
              {blogLoading ? (
                <div className="text-center py-20">
                  <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-white/40">Loading posts...</p>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">✍️</div>
                  <p className="text-white/40 mb-2">No posts yet</p>
                  <p className="text-white/20 text-sm">Start writing your first blog post</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => {
                    const CategoryIcon = categoryConfig[post.category].icon;
                    const PrivacyIcon = privacyConfig[post.privacy].icon;
                    return (
                      <article key={post.id} className="glass rounded-2xl overflow-hidden flex flex-col">
                        {post.cover_image && (
                          <div className="relative h-48 overflow-hidden">
                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-lg ${categoryConfig[post.category].bg} flex items-center justify-center`}>
                              <CategoryIcon className={`w-4 h-4 ${categoryConfig[post.category].color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-black italic text-lg leading-tight mb-1">{post.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-white/40">
                                <span className={`flex items-center gap-1 ${privacyConfig[post.privacy].color}`}>
                                  <PrivacyIcon className="w-3 h-3" />
                                </span>
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          {post.excerpt && <p className="text-sm text-white/50 mb-3 line-clamp-2">{post.excerpt}</p>}
                          <p className="text-sm text-white/60 mb-4 flex-1 line-clamp-3">{post.content}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-xs text-white/30">{post.tags?.length || 0} tags</span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => { setEditingBlog(post); setBlogForm({ title: post.title, excerpt: post.excerpt || '', content: post.content, category: post.category, privacy: post.privacy, tags: post.tags || [], cover_image: post.cover_image || '', media_urls: post.media_urls || [], published_at: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : '' }); }} className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-white/40" /></button>
                              <button onClick={() => deleteBlogPost(post.id)} className="p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* UNIVERSE TAB */}
          {activeTab === 'universe' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter text-white">Universe Sections</h3>
                  <p className="text-sm text-white/40">Manage the sections of your ALIENs universe</p>
                </div>
                <p className="text-white/40 text-sm">{universeSections.filter(s => s.isActive).length} active sections</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {universeSections.map((section) => (
                  <div key={section.id} className={`glass p-6 rounded-2xl ${section.isActive ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${section.accent === 'white' ? 'bg-white/10' : section.accent === 'green' ? 'bg-green-500/10' : section.accent === 'pink' ? 'bg-pink-500/10' : section.accent === 'purple' ? 'bg-purple-500/10' : 'bg-orange-500/10'} flex items-center justify-center`}>
                          <LayoutGrid className={`w-5 h-5 ${section.accent === 'white' ? 'text-white' : section.accent === 'green' ? 'text-green-400' : section.accent === 'pink' ? 'text-pink-400' : section.accent === 'purple' ? 'text-purple-400' : 'text-orange-400'}`} />
                        </div>
                        <div>
                          <h4 className="font-black italic text-lg">{section.name}</h4>
                          <p className="text-xs text-white/40">{section.path}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase ${section.isActive ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}
                      >
                        {section.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </div>
                    <p className="text-sm text-white/50 mb-4">{section.description}</p>
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span>Accent: <span className={section.accent === 'white' ? 'text-white' : `text-${section.accent}-400`}>{section.accent}</span></span>
                      <span>Order: {section.order}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass p-6 rounded-2xl mt-8">
                <h4 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4">Instructions</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li>• Click "Active/Hidden" to toggle section visibility in navigation</li>
                  <li>• Sections are saved to browser storage</li>
                  <li>• Changes take effect immediately on the site</li>
                  <li>• To add new sections, edit the code in <code className="text-green-400">src/components/Navbar.tsx</code></li>
                </ul>
              </div>
            </div>
          )}

          {/* SWEET SPICE TAB */}
          {activeTab === 'sweet-spice' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 — Request Queue */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black italic uppercase tracking-tighter text-white">Requests</h3>
                  <select
                    value={sweetSpiceStatusFilter}
                    onChange={(e) => setSweetSpiceStatusFilter(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-lg px-3 py-1 text-sm text-white"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="accessed">Accessed</option>
                  </select>
                </div>

                {sweetSpiceLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full mx-auto" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sweetSpiceRequests
                      .filter(r => sweetSpiceStatusFilter === 'all' || r.status === sweetSpiceStatusFilter)
                      .map((request) => (
                        <div
                          key={request.id}
                          onClick={() => { setSelectedSweetSpiceRequest(request); setGeneratedCode(''); }}
                          className={`glass p-4 rounded-xl cursor-pointer transition-all ${
                            selectedSweetSpiceRequest?.id === request.id
                              ? 'border-pink-500/50 bg-pink-500/5'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm">
                              {request.name || 'Anonymous'}
                            </span>
                            <Badge
                              variant="outline"
                              className={`
                                ${request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                                ${request.status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                                ${request.status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                                ${request.status === 'accessed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                              `}
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <span>Score: {request.score || '—'}</span>
                            <span>•</span>
                            <span>{new Date(request.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Column 2 — Full Record View */}
              <div className="lg:col-span-2 space-y-4">
                {selectedSweetSpiceRequest ? (
                  <div className="glass border-pink-500/20 p-6 rounded-2xl space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
                          {selectedSweetSpiceRequest.name || 'Anonymous'}
                        </h3>
                        <p className="text-sm text-white/40">
                          {selectedSweetSpiceRequest.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-pink-400">
                          {selectedSweetSpiceRequest.score || '—'}
                        </p>
                        <p className="text-xs text-white/40">match score</p>
                      </div>
                    </div>

                    {/* Evaluation Summary */}
                    {selectedSweetSpiceRequest.evaluation_summary && (
                      <div className="bg-white/5 p-4 rounded-xl">
                        <p className="text-sm text-white/60 italic">
                          "{selectedSweetSpiceRequest.evaluation_summary}"
                        </p>
                      </div>
                    )}

                    {/* Score Breakdown */}
                    {selectedSweetSpiceRequest.score_breakdown && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Score Breakdown</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(selectedSweetSpiceRequest.score_breakdown).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-white/40 capitalize">{key.replace(/_/g, ' ')}</span>
                              <span className="text-pink-400 font-bold">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Signals Detected */}
                    <div className="grid grid-cols-2 gap-4">
                      {selectedSweetSpiceRequest.key_signals?.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase tracking-widest text-green-400/60">Positive Signals</h4>
                          <ul className="space-y-1">
                            {selectedSweetSpiceRequest.key_signals.map((signal: string, idx: number) => (
                              <li key={idx} className="text-xs text-white/50">• {signal}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedSweetSpiceRequest.disqualify_signals?.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase tracking-widest text-red-400/60">Disqualify Signals</h4>
                          <ul className="space-y-1">
                            {selectedSweetSpiceRequest.disqualify_signals.map((signal: string, idx: number) => (
                              <li key={idx} className="text-xs text-white/50">• {signal}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Answers */}
                    <div className="space-y-4 border-t border-white/10 pt-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Answers</h4>
                      {Object.entries(selectedSweetSpiceRequest.answers || {}).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-black/30 p-3 rounded-lg">
                          <p className="text-xs text-white/30 mb-1">{key}</p>
                          <p className="text-sm text-white/60">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      {selectedSweetSpiceRequest.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => generateAccessCode(selectedSweetSpiceRequest.id)}
                            className="flex-1 bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400"
                          >
                            Approve & Generate Code
                          </Button>
                          <Button
                            onClick={() => updateSweetSpiceStatus(selectedSweetSpiceRequest.id, 'rejected')}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {selectedSweetSpiceRequest.status === 'approved' && (
                        <div className="flex-1 space-y-2">
                          {generatedCode && (
                            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                              <p className="text-xs text-green-400/60 uppercase tracking-widest">Generated Code</p>
                              <p className="text-2xl font-black text-green-400 tracking-widest">{generatedCode}</p>
                              <p className="text-xs text-white/40">Valid for 24 hours</p>
                            </div>
                          )}
                          <p className="text-xs text-white/40 text-center">
                            Code: {selectedSweetSpiceRequest.access_code || '—'}
                          </p>
                          {selectedSweetSpiceRequest.code_used_at && (
                            <p className="text-xs text-blue-400 text-center">
                              Used on {new Date(selectedSweetSpiceRequest.code_used_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Admin Notes</h4>
                      <Textarea
                        placeholder="Add your notes here..."
                        className="bg-black/50 border-white/10 text-white placeholder:text-white/30"
                        value={selectedSweetSpiceRequest.ahmad_notes || ''}
                        onChange={(e) => {
                          supabase
                            .from('sweet_spice_requests')
                            .update({ ahmad_notes: e.target.value })
                            .eq('id', selectedSweetSpiceRequest.id);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="glass p-12 rounded-2xl text-center">
                    <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Select a request to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
        </div>
      </main>
    </div>
  );
}
