import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// Types
export interface ContentBlock {
  id: string;
  block_key: string;
  block_type: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  content_json: any;
  icon: string | null;
  accent_color: string | null;
  text_align: string;
  sort_order: number;
  is_active: boolean;
}

export interface ListItem {
  id: string;
  content: string;
  icon: string | null;
  link_url: string | null;
  accent_color: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ContentTag {
  id: string;
  tag: string;
  emoji: string | null;
  accent_color: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface SectionContent {
  section: {
    id: string;
    key: string;
    name: string;
    description: string | null;
  };
  blocks: ContentBlock[];
  listItems: Record<string, ListItem[]>;
  tags: Record<string, ContentTag[]>;
}

// Hook for fetching content by section
export function useContent(sectionKey: string) {
  const [content, setContent] = useState<SectionContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get section
      const { data: section, error: sectionError } = await supabase
        .from('sections')
        .select('*')
        .eq('key', sectionKey)
        .eq('is_active', true)
        .single();

      if (sectionError) throw sectionError;
      if (!section) throw new Error(`Section '${sectionKey}' not found`);

      // Get content blocks
      const { data: blocks, error: blocksError } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('section_id', section.id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (blocksError) throw blocksError;

      // Get list items for blocks
      const listItems: Record<string, ListItem[]> = {};
      const tags: Record<string, ContentTag[]> = {};

      if (blocks && blocks.length > 0) {
        const blockIds = blocks.map(b => b.id);

        // Fetch list items
        const { data: items, error: itemsError } = await supabase
          .from('list_items')
          .select('*')
          .in('block_id', blockIds)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (itemsError) throw itemsError;

        // Group list items by block
        items?.forEach(item => {
          const blockKey = blocks.find(b => b.id === item.block_id)?.block_key;
          if (blockKey) {
            if (!listItems[blockKey]) listItems[blockKey] = [];
            listItems[blockKey].push(item);
          }
        });

        // Fetch tags
        const { data: tagItems, error: tagsError } = await supabase
          .from('content_tags')
          .select('*')
          .in('block_id', blockIds)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (tagsError) throw tagsError;

        // Group tags by block
        tagItems?.forEach(tag => {
          const blockKey = blocks.find(b => b.id === tag.block_id)?.block_key;
          if (blockKey) {
            if (!tags[blockKey]) tags[blockKey] = [];
            tags[blockKey].push(tag);
          }
        });
      }

      setContent({
        section,
        blocks: blocks || [],
        listItems,
        tags
      });
    } catch (err: any) {
      console.error('Error fetching content:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sectionKey]);

  // Update a content block (admin only)
  const updateBlock = useCallback(async (blockId: string, updates: Partial<ContentBlock>) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .update(updates)
        .eq('id', blockId);

      if (error) throw error;

      // Refresh content
      await fetchContent();
      return true;
    } catch (err: any) {
      console.error('Error updating block:', err);
      return false;
    }
  }, [fetchContent]);

  // Update a list item (admin only)
  const updateListItem = useCallback(async (itemId: string, updates: Partial<ListItem>) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .update(updates)
        .eq('id', itemId);

      if (error) throw error;

      await fetchContent();
      return true;
    } catch (err: any) {
      console.error('Error updating list item:', err);
      return false;
    }
  }, [fetchContent]);

  // Add new list item (admin only)
  const addListItem = useCallback(async (blockId: string, content: string, icon?: string) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .insert({
          block_id: blockId,
          content,
          icon,
          sort_order: 999
        });

      if (error) throw error;

      await fetchContent();
      return true;
    } catch (err: any) {
      console.error('Error adding list item:', err);
      return false;
    }
  }, [fetchContent]);

  // Delete list item (admin only)
  const deleteListItem = useCallback(async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      await fetchContent();
      return true;
    } catch (err: any) {
      console.error('Error deleting list item:', err);
      return false;
    }
  }, [fetchContent]);

  // Add new tag (admin only)
  const addTag = useCallback(async (blockId: string, tag: string, emoji?: string) => {
    try {
      const { error } = await supabase
        .from('content_tags')
        .insert({
          block_id: blockId,
          tag,
          emoji,
          sort_order: 999
        });

      if (error) throw error;

      await fetchContent();
      return true;
    } catch (err: any) {
      console.error('Error adding tag:', err);
      return false;
    }
  }, [fetchContent]);

  // Delete tag (admin only)
  const deleteTag = useCallback(async (tagId: string) => {
    try {
      const { error } = await supabase
        .from('content_tags')
        .delete()
        .eq('id', tagId);

      if (error) throw error;

      await fetchContent();
      return true;
    } catch (err: any) {
      console.error('Error deleting tag:', err);
      return false;
    }
  }, [fetchContent]);

  // Real-time subscription
  useEffect(() => {
    fetchContent();

    // Subscribe to changes
    const subscription = supabase
      .channel(`content-${sectionKey}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content_blocks' },
        () => fetchContent()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'list_items' },
        () => fetchContent()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content_tags' },
        () => fetchContent()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [sectionKey, fetchContent]);

  return {
    content,
    blocks: content?.blocks || [],
    listItems: content?.listItems || {},
    tags: content?.tags || {},
    loading,
    error,
    refresh: fetchContent,
    updateBlock,
    updateListItem,
    addListItem,
    deleteListItem,
    addTag,
    deleteTag
  };
}

// Helper to get block by key
export function useBlock(content: SectionContent | null, blockKey: string) {
  return content?.blocks.find(b => b.block_key === blockKey);
}

// Helper to get list items for block
export function useListItems(content: SectionContent | null, blockKey: string) {
  return content?.listItems[blockKey] || [];
}

// Helper to get tags for block
export function useTags(content: SectionContent | null, blockKey: string) {
  return content?.tags[blockKey] || [];
}
