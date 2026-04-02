import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Inbox, CheckCircle, Archive, Trash2, Eye, Mail, 
  Phone, Building2, ExternalLink, X, Filter, Search,
  LogOut, RefreshCw, AlertCircle, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequests } from '@/hooks/useSupabase';
import { useAuth } from '@/hooks/useSupabase';
import { Request } from '@/lib/supabase';
import { cn } from '@/lib/utils';

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
};

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { requests, stats, loading, error, refetch, updateRequest, deleteRequest, markAsViewed } = useRequests();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not logged in
  if (!user && !loading) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="font-medium italic">Loading requests...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                <Inbox className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h1 className="text-lg font-black italic uppercase tracking-tighter text-white">
                  Request Inbox
                </h1>
                <p className="text-xs text-white/40">
                  {requests.length} total requests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-400">
                {getStatsCount('new')} New
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Clock className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-medium text-orange-400">
                {getStatsCount('in_review')} In Review
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <CheckCircle className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">
                {getStatsCount('responded')} Responded
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Archive className="w-3 h-3 text-white/40" />
              <span className="text-xs font-medium text-white/40">
                {getStatsCount('archived')} Archived
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search by name, email, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
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
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request List */}
          <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
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
                    selectedRequest?.id === request.id 
                      ? "border-green-500/50 bg-green-500/5" 
                      : "hover:border-white/20",
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
                  <p className="text-[10px] text-white/20 mt-2">
                    {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Request Detail */}
          <div className="lg:col-span-2">
            {selectedRequest ? (
              <div className="glass p-6">
                {/* Header */}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedRequest.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRequest(null)}
                      className="border-white/10 text-white/60"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['new', 'in_review', 'responded', 'archived'].map((status) => (
                    <Button
                      key={status}
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedRequest.id, status)}
                      className={cn(
                        "text-xs",
                        selectedRequest.status === status
                          ? statusColors[status as keyof typeof statusColors]
                          : "border-white/10 text-white/40"
                      )}
                    >
                      {status === 'new' && <Inbox className="w-3 h-3 mr-1" />}
                      {status === 'in_review' && <Eye className="w-3 h-3 mr-1" />}
                      {status === 'responded' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {status === 'archived' && <Archive className="w-3 h-3 mr-1" />}
                      {status.replace('_', ' ')}
                    </Button>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/40" />
                    <a href={`mailto:${selectedRequest.email}`} className="text-sm text-white hover:text-green-400 transition-colors">
                      {selectedRequest.email}
                    </a>
                  </div>
                  {selectedRequest.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-white/40" />
                      <a href={`tel:${selectedRequest.phone}`} className="text-sm text-white hover:text-green-400 transition-colors">
                        {selectedRequest.phone}
                      </a>
                    </div>
                  )}
                  {selectedRequest.linkedin && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-white/40" />
                      <a 
                        href={selectedRequest.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-white hover:text-green-400 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {selectedRequest.organization && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-white/40" />
                      <span className="text-sm text-white">{selectedRequest.organization}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Message</h3>
                  <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                    {selectedRequest.details}
                  </p>
                </div>

                {/* Attachment */}
                {selectedRequest.file_url && (
                  <div className="mb-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <h3 className="text-xs font-black uppercase tracking-widest text-green-400 mb-2">Attachment</h3>
                    <a 
                      href={selectedRequest.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {selectedRequest.file_name || 'View Attachment'}
                    </a>
                  </div>
                )}

                {/* Metadata */}
                <div className="pt-6 border-t border-white/10 text-xs text-white/30">
                  <p>Received: {new Date(selectedRequest.created_at).toLocaleString()}</p>
                  {selectedRequest.viewed_at && (
                    <p>Viewed: {new Date(selectedRequest.viewed_at).toLocaleString()}</p>
                  )}
                  {selectedRequest.responded_at && (
                    <p>Responded: {new Date(selectedRequest.responded_at).toLocaleString()}</p>
                  )}
                </div>
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
    </div>
  );
}
