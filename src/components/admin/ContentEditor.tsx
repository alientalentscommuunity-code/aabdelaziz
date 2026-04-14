import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Layout, ChevronRight, Save, Plus, Trash2, 
  Type, List, Hash, Image, Quote, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Section {
  id: string;
  key: string;
  name: string;
  description: string | null;
}

interface ContentBlock {
  id: string;
  block_key: string;
  block_type: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  content_json: any;
  icon: string | null;
  accent_color: string | null;
  sort_order: number;
  is_active: boolean;
}

interface ListItem {
  id: string;
  content: string;
  icon: string | null;
  sort_order: number;
}

interface ContentTag {
  id: string;
  tag: string;
  emoji: string | null;
}

export function ContentEditor() {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [tags, setTags] = useState<ContentTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [editForm, setEditForm] = useState<Partial<ContentBlock>>({});
  const [newItemText, setNewItemText] = useState('');
  const [newTagText, setNewTagText] = useState('');
  const [newTagEmoji, setNewTagEmoji] = useState('');

  // Fetch sections
  useEffect(() => {
    fetchSections();
  }, []);

  // Fetch blocks when section changes
  useEffect(() => {
    if (selectedSection) {
      fetchBlocks(selectedSection);
    }
  }, [selectedSection]);

  // Fetch items when block changes
  useEffect(() => {
    if (selectedBlock) {
      setEditForm({
        title: selectedBlock.title,
        subtitle: selectedBlock.subtitle,
        content: selectedBlock.content,
        accent_color: selectedBlock.accent_color,
        icon: selectedBlock.icon,
      });

      if (selectedBlock.block_type === 'list') {
        fetchListItems(selectedBlock.id);
      } else if (selectedBlock.block_type === 'tags') {
        fetchTags(selectedBlock.id);
      }
    }
  }, [selectedBlock]);

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (!error && data) {
      setSections(data);
      if (data.length > 0) {
        setSelectedSection(data[0].id);
      }
    }
  };

  const fetchBlocks = async (sectionId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('section_id', sectionId)
      .eq('is_active', true)
      .order('sort_order');
    
    if (!error && data) {
      setBlocks(data);
      setSelectedBlock(null);
    }
    setLoading(false);
  };

  const fetchListItems = async (blockId: string) => {
    const { data, error } = await supabase
      .from('list_items')
      .select('*')
      .eq('block_id', blockId)
      .eq('is_active', true)
      .order('sort_order');
    
    if (!error && data) {
      setListItems(data);
    }
  };

  const fetchTags = async (blockId: string) => {
    const { data, error } = await supabase
      .from('content_tags')
      .select('*')
      .eq('block_id', blockId)
      .eq('is_active', true)
      .order('sort_order');
    
    if (!error && data) {
      setTags(data);
    }
  };

  const saveBlock = async () => {
    if (!selectedBlock) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('content_blocks')
      .update({
        title: editForm.title,
        subtitle: editForm.subtitle,
        content: editForm.content,
        accent_color: editForm.accent_color,
        icon: editForm.icon,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedBlock.id);

    setSaving(false);
    
    if (error) {
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } else {
      setMessage({ type: 'success', text: 'Saved successfully!' });
      fetchBlocks(selectedSection);
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  const addListItem = async () => {
    if (!selectedBlock || !newItemText.trim()) return;

    const { error } = await supabase
      .from('list_items')
      .insert({
        block_id: selectedBlock.id,
        content: newItemText.trim(),
        sort_order: listItems.length + 1
      });

    if (!error) {
      setNewItemText('');
      fetchListItems(selectedBlock.id);
    }
  };

  const deleteListItem = async (itemId: string) => {
    const { error } = await supabase
      .from('list_items')
      .delete()
      .eq('id', itemId);

    if (!error && selectedBlock) {
      fetchListItems(selectedBlock.id);
    }
  };

  const addTag = async () => {
    if (!selectedBlock || !newTagText.trim()) return;

    const { error } = await supabase
      .from('content_tags')
      .insert({
        block_id: selectedBlock.id,
        tag: newTagText.trim(),
        emoji: newTagEmoji || null,
        sort_order: tags.length + 1
      });

    if (!error) {
      setNewTagText('');
      setNewTagEmoji('');
      fetchTags(selectedBlock.id);
    }
  };

  const deleteTag = async (tagId: string) => {
    const { error } = await supabase
      .from('content_tags')
      .delete()
      .eq('id', tagId);

    if (!error && selectedBlock) {
      fetchTags(selectedBlock.id);
    }
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'hero': return <Layout size={14} className="text-orange-400" />;
      case 'text': case 'markdown': return <Type size={14} className="text-blue-400" />;
      case 'list': return <List size={14} className="text-green-400" />;
      case 'tags': return <Hash size={14} className="text-purple-400" />;
      case 'quote': return <Quote size={14} className="text-pink-400" />;
      default: return <Type size={14} className="text-white/40" />;
    }
  };

  const getAccentColorClass = (color: string | null) => {
    const colors: Record<string, string> = {
      orange: 'border-l-orange-500',
      pink: 'border-l-pink-500',
      green: 'border-l-green-500',
      purple: 'border-l-purple-500',
      blue: 'border-l-blue-500',
    };
    return colors[color || ''] || 'border-l-white/20';
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Sections & Blocks */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-black/20">
        {/* Section Selector */}
        <div className="p-4 border-b border-white/10">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
            Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        {/* Blocks List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">
            Content Blocks
          </h3>
          <div className="space-y-2">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => setSelectedBlock(block)}
                className={`w-full text-left p-3 rounded-lg border-l-2 transition-all ${
                  selectedBlock?.id === block.id
                    ? 'bg-white/10 border-l-white'
                    : `bg-white/5 hover:bg-white/10 ${getAccentColorClass(block.accent_color)}`
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {getBlockIcon(block.block_type)}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    {block.block_type}
                  </span>
                </div>
                <p className="text-sm font-medium text-white/80 truncate">
                  {block.title || block.block_key}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedBlock ? (
          <div className="max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                  <span>{sections.find(s => s.id === selectedSection)?.name}</span>
                  <ChevronRight size={14} />
                  <span className="text-white/60">{selectedBlock.block_key}</span>
                </div>
                <h2 className="text-xl font-black text-white">Edit Content Block</h2>
              </div>
              <Button
                onClick={saveBlock}
                disabled={saving}
                className="bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400"
              >
                <Save size={14} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

            {/* Message */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                <AlertCircle size={16} />
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
                  Title
                </label>
                <Input
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="bg-black/50 border-white/20 text-white"
                  placeholder="Block title..."
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
                  Subtitle
                </label>
                <Input
                  value={editForm.subtitle || ''}
                  onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                  className="bg-black/50 border-white/20 text-white"
                  placeholder="Subtitle..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
                  Content (Markdown supported)
                </label>
                <Textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="bg-black/50 border-white/20 text-white min-h-[200px]"
                  placeholder="Content here..."
                />
              </div>

              {/* Icon & Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
                    Icon
                  </label>
                  <Input
                    value={editForm.icon || ''}
                    onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                    className="bg-black/50 border-white/20 text-white"
                    placeholder="Icon name..."
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block">
                    Accent Color
                  </label>
                  <select
                    value={editForm.accent_color || ''}
                    onChange={(e) => setEditForm({ ...editForm, accent_color: e.target.value })}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="">None</option>
                    <option value="orange">Orange</option>
                    <option value="pink">Pink</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
              </div>

              {/* Type-specific editors */}
              {selectedBlock.block_type === 'list' && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/60 mb-4">
                    List Items
                  </h3>
                  <div className="space-y-2 mb-4">
                    {listItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 bg-white/5 p-3 rounded-lg group"
                      >
                        <span className="flex-1 text-white/80">{item.content}</span>
                        <button
                          onClick={() => deleteListItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addListItem()}
                      className="flex-1 bg-black/50 border-white/20 text-white"
                      placeholder="Add new list item..."
                    />
                    <Button
                      onClick={addListItem}
                      className="bg-green-500 text-black"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {selectedBlock.block_type === 'tags' && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/60 mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 group"
                      >
                        {tag.emoji && <span>{tag.emoji}</span>}
                        <span>{tag.tag}</span>
                        <button
                          onClick={() => deleteTag(tag.id)}
                          className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTagText}
                      onChange={(e) => setNewTagText(e.target.value)}
                      className="flex-1 bg-black/50 border-white/20 text-white"
                      placeholder="Tag name..."
                    />
                    <Input
                      value={newTagEmoji}
                      onChange={(e) => setNewTagEmoji(e.target.value)}
                      className="w-20 bg-black/50 border-white/20 text-white text-center"
                      placeholder="Emoji"
                      maxLength={2}
                    />
                    <Button
                      onClick={addTag}
                      className="bg-green-500 text-black"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <Layout size={48} className="mx-auto mb-4 opacity-20" />
              <p>Select a content block to edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
