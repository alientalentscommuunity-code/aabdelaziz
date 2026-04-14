import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useSupabase';
import { Pencil, Save, X, Plus, Trash2 } from 'lucide-react';

interface ListItem {
  id: string;
  content: string;
  icon?: string | null;
}

interface ContentTag {
  id: string;
  tag: string;
  emoji?: string | null;
}

interface InlineEditProps {
  content: string;
  onSave?: (value: string) => Promise<boolean>;
  sectionId?: string;
  blockKey?: string;
  field?: string;
  blockId?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
}

// Inline text editor component
export function InlineEdit({ 
  content, 
  onSave, 
  multiline = false, 
  className = '', 
  as: Component = 'div' 
}: InlineEditProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue === content) {
      setIsEditing(false);
      return;
    }

    setSaving(true);
    const success = await onSave(editValue);
    setSaving(false);
    
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isAdmin) {
    return <Component className={className}>{content}</Component>;
  }

  if (isEditing) {
    return (
      <div className={`relative group ${className}`}>
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-2 text-inherit font-inherit resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={saving}
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-yellow-500/10 border-2 border-yellow-500 rounded-lg px-2 py-1 text-inherit font-inherit focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={saving}
          />
        )}
        <div className="absolute -right-2 -top-2 flex gap-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors shadow-lg"
            title="Save"
          >
            <Save size={14} />
          </button>
          <button
            onClick={handleCancel}
            disabled={saving}
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="Cancel"
          >
            <X size={14} />
          </button>
        </div>
        {saving && (
          <span className="absolute right-2 bottom-2 text-xs text-yellow-600">Saving...</span>
        )}
      </div>
    );
  }

  return (
    <Component 
      className={`relative group cursor-pointer hover:bg-yellow-500/5 rounded transition-colors ${className}`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {content}
      <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil size={14} className="text-yellow-500" />
      </span>
    </Component>
  );
}

// Editable list component
interface EditableListProps {
  items: ListItem[];
  accentColor?: string;
  onUpdate?: (id: string, updates: Partial<ListItem>) => Promise<boolean>;
  onDelete?: (id: string) => Promise<boolean>;
  onAdd?: (blockId: string, content: string, icon?: string) => Promise<boolean>;
  blockId?: string;
  className?: string;
}

export function EditableList({ 
  items, 
  onUpdate, 
  onDelete, 
  onAdd,
  blockId,
  accentColor = 'primary',
  className = '' 
}: EditableListProps) {
  const { isAdmin } = useAuth();
  const [newItem, setNewItem] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!newItem.trim()) return;
    const success = await onAdd(blockId, newItem.trim());
    if (success) {
      setNewItem('');
      setAdding(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <EditableListItem
          key={item.id}
          item={item}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isAdmin={isAdmin}
          accentColor={accentColor}
        />
      ))}
      
      {isAdmin && (
        <div className="pt-2">
          {adding ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                  if (e.key === 'Escape') {
                    setAdding(false);
                    setNewItem('');
                  }
                }}
                placeholder="Add new item..."
                className="flex-1 bg-green-500/10 border border-green-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
              >
                <Save size={16} />
              </button>
              <button
                onClick={() => {
                  setAdding(false);
                  setNewItem('');
                }}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Add Item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Individual editable list item
function EditableListItem({ 
  item, 
  onUpdate, 
  onDelete, 
  isAdmin,
  accentColor 
}: { 
  item: { id: string; content: string; icon?: string | null };
  onUpdate: (id: string, updates: Partial<{ id: string; content: string; icon?: string | null }>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  isAdmin: boolean;
  accentColor: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.content);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (editValue === item.content) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    const success = await onUpdate(item.id, { content: editValue });
    setSaving(false);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this item?')) {
      await onDelete(item.id);
    }
  };

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center bg-yellow-500/10 border border-yellow-500 rounded-lg px-3 py-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
              setEditValue(item.content);
              setIsEditing(false);
            }
          }}
          className="flex-1 bg-transparent border-none outline-none"
          autoFocus
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-green-500 hover:text-green-400"
        >
          <Save size={16} />
        </button>
        <button
          onClick={() => {
            setEditValue(item.content);
            setIsEditing(false);
          }}
          className="text-red-500 hover:text-red-400"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`group flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors ${isAdmin ? 'cursor-pointer' : ''}`}
      onClick={() => isAdmin && setIsEditing(true)}
    >
      <span className="text-white/80">{item.content}</span>
      {isAdmin && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-yellow-500 hover:text-yellow-400 p-1"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-500 hover:text-red-400 p-1"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// Editable tags component
interface EditableTagsProps {
  items: ContentTag[];
  onAdd?: (blockId: string, tag: string, emoji?: string) => Promise<boolean>;
  onDelete?: (id: string) => Promise<boolean>;
  blockId?: string;
  accentColor?: string;
  className?: string;
}

export function EditableTags({ 
  items, 
  onAdd, 
  onDelete,
  blockId,
  accentColor = 'green',
  className = '' 
}: EditableTagsProps) {
  const { isAdmin } = useAuth();
  const [newTag, setNewTag] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!newTag.trim()) return;
    const success = await onAdd(blockId, newTag.trim());
    if (success) {
      setNewTag('');
      setAdding(false);
    }
  };

  const colorClasses: Record<string, string> = {
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
    pink: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  const colorClass = colorClasses[accentColor] || colorClasses.green;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((tag) => (
        <span
          key={tag.id}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border ${colorClass} group relative`}
        >
          {tag.emoji && <span>{tag.emoji}</span>}
          <span>{tag.tag}</span>
          {isAdmin && (
            <button
              onClick={() => onDelete(tag.id)}
              className="ml-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
            >
              <X size={12} />
            </button>
          )}
        </span>
      ))}
      
      {isAdmin && (
        <>
          {adding ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                  if (e.key === 'Escape') {
                    setAdding(false);
                    setNewTag('');
                  }
                }}
                placeholder="New tag..."
                className="bg-green-500/10 border border-green-500 rounded-full px-3 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              <button
                onClick={handleAdd}
                className="text-green-500 hover:text-green-400"
              >
                <Save size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border border-dashed border-white/30 text-white/50 hover:text-white hover:border-white/50 transition-colors`}
            >
              <Plus size={12} />
              Add
            </button>
          )}
        </>
      )}
    </div>
  );
}
