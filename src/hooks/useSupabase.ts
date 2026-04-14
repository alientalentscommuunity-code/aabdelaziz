import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Request, RequestStats } from '@/lib/supabase';

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [stats, setStats] = useState<RequestStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('request_stats')
        .select('*');

      if (error) throw error;
      setStats(data || []);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const updateRequest = async (id: string, updates: Partial<Request>) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchRequests();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update request');
      return false;
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchRequests();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete request');
      return false;
    }
  };

  const markAsViewed = async (id: string) => {
    await updateRequest(id, { viewed_at: new Date().toISOString() });
  };

  useEffect(() => {
    fetchRequests();
    fetchStats();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('requests_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'requests' },
        () => {
          fetchRequests();
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    requests,
    stats,
    loading,
    error,
    refetch: fetchRequests,
    updateRequest,
    deleteRequest,
    markAsViewed,
  };
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userType, setUserType] = useState('visitor');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string, currentUser: any) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data && !error) {
      setUserProfile(data);
      setUserType(data.user_type);
      // Check admin from both users table and auth metadata
      const isUserAdmin = data.user_type === 'admin' || 
                          currentUser?.user_metadata?.role === 'admin' ||
                          currentUser?.app_metadata?.role === 'admin';
      setIsAdmin(isUserAdmin);
    } else {
      // Fallback to auth metadata if no profile found
      const userRole = currentUser?.user_metadata?.role;
      const isUserAdmin = userRole === 'admin' || currentUser?.app_metadata?.role === 'admin';
      setIsAdmin(isUserAdmin);
    }
  };

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        fetchUserProfile(currentUser.id, currentUser);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        fetchUserProfile(currentUser.id, currentUser);
      } else {
        setUserProfile(null);
        setUserType('visitor');
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setUserType('visitor');
  };

  return { user, userProfile, userType, isAdmin, loading, signIn, signOut };
}
