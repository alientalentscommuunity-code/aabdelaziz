import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
}

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
