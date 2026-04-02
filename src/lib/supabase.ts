import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nyzpljwsyrqqqurgdycq.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55enBsandzeXJxcXF1cmdkeWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMzIzMDUsImV4cCI6MjA5MDYwODMwNX0.D7arDIh00zty5gYqGHtz_n5cRAzoJ_nC8oJtP70HyfQ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for requests
export interface Request {
  id: string;
  created_at: string;
  updated_at: string;
  persona: string;
  purpose: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  organization?: string;
  details: string;
  file_name?: string;
  file_url?: string;
  status: 'new' | 'in_review' | 'responded' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  viewed_at?: string;
  responded_at?: string;
}

export interface RequestStats {
  status: string;
  count: number;
  latest_request: string;
}
