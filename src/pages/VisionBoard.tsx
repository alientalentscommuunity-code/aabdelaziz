import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Filter, Search, Calendar, Link as LinkIcon, 
  FileText, Lock, Globe, Users, MoreVertical, 
  CheckCircle2, Circle, Clock, AlertCircle, Target,
  ChevronDown, ChevronUp, Trash2, Edit2, Save, X,
  Heart, Briefcase, Sparkles, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  files: string[];
  privacy: 'private' | 'shared' | 'public';
  subtasks: Subtask[];
  created_at: string;
  updated_at: string;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

const categoryConfig = {
  human: { label: 'Human', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  career: { label: 'Career', icon: Briefcase, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  'sweet-spice': { label: 'Sweet Spice', icon: Sparkles, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  universe: { label: 'Universe', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
};

const statusConfig = {
  'not-started': { label: 'Not Started', icon: Circle, color: 'text-white/40' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'text-blue-400' },
  'completed': { label: 'Completed', icon: CheckCircle2, color: 'text-green-400' },
  'on-hold': { label: 'On Hold', icon: AlertCircle, color: 'text-orange-400' },
};

const privacyConfig = {
  private: { label: 'Private', icon: Lock, color: 'text-red-400' },
  shared: { label: 'Shared', icon: Users, color: 'text-blue-400' },
  public: { label: 'Public', icon: Globe, color: 'text-green-400' },
};

export default function VisionBoard() {
  const [items, setItems] = useState<VisionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPrivacy, setFilterPrivacy] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<VisionItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'universe' as VisionItem['category'],
    priority: 'medium' as VisionItem['priority'],
    target_date: '',
    privacy: 'private' as VisionItem['privacy'],
    links: [] as string[],
    subtasks: [] as { title: string; completed: boolean }[],
  });

  const [newSubtask, setNewSubtask] = useState('');
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    fetchVisionItems();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
  };

  const fetchVisionItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vision_board_items')
        .select(`
          *,
          subtasks:vision_board_subtasks(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching vision items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from('vision_board_items')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          target_date: formData.target_date || null,
          privacy: formData.privacy,
          links: formData.links,
          progress: 0,
          status: 'not-started',
        })
        .select()
        .single();

      if (error) throw error;

      if (formData.subtasks.length > 0 && data) {
        const subtasksData = formData.subtasks.map(st => ({
          vision_item_id: data.id,
          title: st.title,
          completed: st.completed,
        }));
        await supabase.from('vision_board_subtasks').insert(subtasksData);
      }

      setIsCreating(false);
      resetForm();
      fetchVisionItems();
    } catch (error) {
      console.error('Error creating vision item:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from('vision_board_items')
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          target_date: formData.target_date || null,
          privacy: formData.privacy,
          links: formData.links,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      // Update subtasks
      await supabase.from('vision_board_subtasks').delete().eq('vision_item_id', editingItem.id);
      if (formData.subtasks.length > 0) {
        const subtasksData = formData.subtasks.map(st => ({
          vision_item_id: editingItem.id,
          title: st.title,
          completed: st.completed,
        }));
        await supabase.from('vision_board_subtasks').insert(subtasksData);
      }

      setEditingItem(null);
      resetForm();
      fetchVisionItems();
    } catch (error) {
      console.error('Error updating vision item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vision item?')) return;

    try {
      const { error } = await supabase.from('vision_board_items').delete().eq('id', id);
      if (error) throw error;
      fetchVisionItems();
    } catch (error) {
      console.error('Error deleting vision item:', error);
    }
  };

  const toggleSubtask = async (itemId: string, subtaskId: string, completed: boolean) => {
    try {
      await supabase
        .from('vision_board_subtasks')
        .update({ completed: !completed })
        .eq('id', subtaskId);
      fetchVisionItems();
    } catch (error) {
      console.error('Error toggling subtask:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'universe',
      priority: 'medium',
      target_date: '',
      privacy: 'private',
      links: [],
      subtasks: [],
    });
    setNewSubtask('');
    setNewLink('');
  };

  const startEdit = (item: VisionItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      priority: item.priority,
      target_date: item.target_date || '',
      privacy: item.privacy,
      links: item.links || [],
      subtasks: item.subtasks || [],
    });
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: newSubtask, completed: false }],
    });
    setNewSubtask('');
  };

  const removeSubtask = (index: number) => {
    setFormData({
      ...formData,
      subtasks: formData.subtasks.filter((_, i) => i !== index),
    });
  };

  const addLink = () => {
    if (!newLink.trim()) return;
    setFormData({
      ...formData,
      links: [...formData.links, newLink],
    });
    setNewLink('');
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    });
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredItems = items.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterPrivacy !== 'all' && item.privacy !== filterPrivacy) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const renderForm = () => (
    <div className="glass p-6 rounded-2xl mb-8">
      <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">
        {editingItem ? 'Edit Vision' : 'New Vision'}
      </h3>

      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-white/5 border-white/10"
        />

        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-white/5 border-white/10 min-h-[100px]"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as VisionItem['category'] })}
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
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as VisionItem['priority'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
              Target Date
            </label>
            <Input
              type="date"
              value={formData.target_date}
              onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
              Privacy
            </label>
            <select
              value={formData.privacy}
              onChange={(e) => setFormData({ ...formData, privacy: e.target.value as VisionItem['privacy'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="private">Private</option>
              <option value="shared">Shared</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Subtasks */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Subtasks
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add subtask..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
              className="bg-white/5 border-white/10"
            />
            <Button onClick={addSubtask} variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {formData.subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Circle className="w-4 h-4 text-white/40" />
                <span className="flex-1 text-white/60">{subtask.title}</span>
                <button onClick={() => removeSubtask(index)} className="text-red-400 hover:text-red-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Links
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add URL..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLink()}
              className="bg-white/5 border-white/10"
            />
            <Button onClick={addLink} variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {formData.links.map((link, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <LinkIcon className="w-4 h-4 text-blue-400" />
                <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-400 hover:underline truncate">
                  {link}
                </a>
                <button onClick={() => removeLink(index)} className="text-red-400 hover:text-red-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={editingItem ? handleUpdate : handleCreate}
            className="flex-1 bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400"
          >
            <Save className="w-4 h-4 mr-2" />
            {editingItem ? 'Save Changes' : 'Create Vision'}
          </Button>
          <Button
            onClick={() => {
              setIsCreating(false);
              setEditingItem(null);
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
              Vision Board
            </h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Dreams, plans, and everything I'm building toward.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              {isAdmin && (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-orange-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-orange-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Vision
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Search visions..."
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

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="all" className="bg-black text-white">All Status</option>
                <option value="not-started" className="bg-black text-white">Not Started</option>
                <option value="in-progress" className="bg-black text-white">In Progress</option>
                <option value="completed" className="bg-black text-white">Completed</option>
                <option value="on-hold" className="bg-black text-white">On Hold</option>
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
          {isAdmin && (isCreating || editingItem) && renderForm()}

          {/* Vision Items Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-white/40">Loading visions...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <Target className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 mb-2">No visions found</p>
              <p className="text-white/20 text-sm">Create your first vision item</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const CategoryIcon = categoryConfig[item.category].icon;
                const StatusIcon = statusConfig[item.status].icon;
                const PrivacyIcon = privacyConfig[item.privacy].icon;
                const isExpanded = expandedItems.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`glass p-6 rounded-2xl ${categoryConfig[item.category].border} hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${categoryConfig[item.category].bg} flex items-center justify-center shrink-0`}>
                        <CategoryIcon className={`w-5 h-5 ${categoryConfig[item.category].color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black italic text-lg leading-tight mb-1 truncate">{item.title}</h3>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`flex items-center gap-1 ${statusConfig[item.status].color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[item.status].label}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-white/40">{item.priority}</span>
                          <span className="text-white/20">•</span>
                          <span className={`flex items-center gap-1 ${privacyConfig[item.privacy].color}`}>
                            <PrivacyIcon className="w-3 h-3" />
                            {privacyConfig[item.privacy].label}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => startEdit(item)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-white/40" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-sm text-white/50 mb-4 line-clamp-2">{item.description}</p>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40">Progress</span>
                        <span className="text-orange-400 font-black">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Subtasks Preview */}
                    {item.subtasks && item.subtasks.length > 0 && (
                      <div className="mb-4">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors mb-2"
                        >
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          {item.subtasks.filter(st => st.completed).length}/{item.subtasks.length} subtasks
                        </button>
                        {isExpanded && (
                          <div className="space-y-1 pl-4">
                            {item.subtasks.map((subtask) => (
                              <div
                                key={subtask.id}
                                onClick={() => toggleSubtask(item.id, subtask.id, subtask.completed)}
                                className="flex items-center gap-2 text-sm cursor-pointer group"
                              >
                                {subtask.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Circle className="w-4 h-4 text-white/40 group-hover:text-white/60" />
                                )}
                                <span className={subtask.completed ? 'text-white/40 line-through' : 'text-white/60'}>
                                  {subtask.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] bg-white/5 hover:bg-white/10 text-blue-400 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                            <LinkIcon className="w-3 h-3" />
                            Link {idx + 1}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <div className="flex items-center gap-3">
                        {item.target_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.target_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <span>
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
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
