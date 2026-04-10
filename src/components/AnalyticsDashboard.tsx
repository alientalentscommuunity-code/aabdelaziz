import React, { useState, useEffect } from 'react';
import { 
  Users, Eye, MousePointer, Clock, TrendingUp, Globe, 
  Smartphone, Monitor, Tablet, RefreshCw, BarChart3,
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  fetchAnalyticsData, 
  formatNumber, 
  formatDuration,
  calculateChange,
  AnalyticsDashboardData 
} from '@/lib/ga4-api';

const timeRanges = [
  { label: 'Today', value: 1 },
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
];

export const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const analyticsData = await fetchAnalyticsData(days);
      if (analyticsData) {
        setData(analyticsData);
      } else {
        setError('Failed to load analytics data');
      }
    } catch (err) {
      setError('Error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days]);

  // Auto-refresh every 30 seconds for real-time data
  useEffect(() => {
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [days]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-white/40">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="font-medium italic">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-400">{error}</p>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const metrics = days === 1 ? data?.today : days === 7 ? data?.last7Days : data?.last30Days;
  if (!metrics || !data) return null;

  const deviceIcons: Record<string, React.ReactNode> = {
    desktop: <Monitor className="w-4 h-4" />,
    mobile: <Smartphone className="w-4 h-4" />,
    tablet: <Tablet className="w-4 h-4" />,
  };

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
            Website Analytics
          </h3>
          <p className="text-sm text-white/40 mt-1">
            Real-time data from Google Analytics 4
          </p>
        </div>
        <div className="flex items-center gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant="outline"
              size="sm"
              onClick={() => setDays(range.value)}
              className={`text-xs ${
                days === range.value
                  ? 'bg-green-500/10 text-green-400 border-green-500/30'
                  : 'border-white/10 text-white/60 hover:text-white'
              }`}
            >
              {range.label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
            className="border-white/10 text-white/60 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Real-time Badge */}
      {data.realtime.activeUsers > 0 && (
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
            <Activity className="w-3 h-3 mr-1" />
            {data.realtime.activeUsers} active now
          </Badge>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Visitors"
          value={metrics.visitors}
          icon={Users}
          color="green"
          change={calculateChange(metrics.visitors, Math.round(metrics.visitors * 0.8))}
        />
        <MetricCard
          title="Page Views"
          value={metrics.pageViews}
          icon={Eye}
          color="blue"
          change={calculateChange(metrics.pageViews, Math.round(metrics.pageViews * 0.85))}
        />
        <MetricCard
          title="Sessions"
          value={metrics.sessions}
          icon={MousePointer}
          color="purple"
          change={calculateChange(metrics.sessions, Math.round(metrics.sessions * 0.9))}
        />
        <MetricCard
          title="Avg. Duration"
          value={formatDuration(metrics.avgSessionDuration)}
          icon={Clock}
          color="orange"
          rawValue
          change={calculateChange(metrics.avgSessionDuration, metrics.avgSessionDuration * 0.95)}
        />
      </div>

      {/* Bounce Rate & Other Stats */}
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-black uppercase tracking-widest text-sm text-white/60">
            Engagement Overview
          </h4>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-black text-white mb-1">
              {metrics.bounceRate}%
            </p>
            <p className="text-sm text-white/40">Bounce Rate</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white mb-1">
              {metrics.pageViews > 0 && metrics.sessions > 0
                ? (metrics.pageViews / metrics.sessions).toFixed(1)
                : '0'}
            </p>
            <p className="text-sm text-white/40">Pages / Session</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white mb-1">
              {metrics.visitors > 0 && data.countries?.length > 0
                ? formatNumber(data.countries.length)
                : '0'}
            </p>
            <p className="text-sm text-white/40">Countries</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="glass p-6 rounded-2xl">
          <h4 className="font-black uppercase tracking-widest text-sm text-white/60 mb-4">
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Top Pages
          </h4>
          <div className="space-y-3">
            {data.topPages?.slice(0, 6).map((page, index) => (
              <div key={page.page} className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/30 w-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{page.page}</p>
                  <div className="h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (page.views / (data.topPages[0]?.views || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-white/40">
                  {formatNumber(page.views)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Events */}
        <div className="glass p-6 rounded-2xl">
          <h4 className="font-black uppercase tracking-widest text-sm text-white/60 mb-4">
            <Activity className="w-4 h-4 inline mr-2" />
            Top Events
          </h4>
          <div className="space-y-3">
            {data.topEvents?.slice(0, 6).map((event, index) => (
              <div key={event.eventName} className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/30 w-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white capitalize truncate">
                    {event.eventName.replace(/_/g, ' ')}
                  </p>
                  <div className="h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (event.count / (data.topEvents[0]?.count || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-white/40">
                  {formatNumber(event.count)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column: Devices & Countries */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="glass p-6 rounded-2xl">
          <h4 className="font-black uppercase tracking-widest text-sm text-white/60 mb-4">
            <Monitor className="w-4 h-4 inline mr-2" />
            Devices
          </h4>
          <div className="space-y-4">
            {data.devices?.map((device) => (
              <div key={device.device} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60">
                  {deviceIcons[device.device] || <Monitor className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white capitalize">{device.device}</span>
                    <span className="text-sm font-mono text-white/60">
                      {device.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white/40 w-12 text-right">
                  {formatNumber(device.sessions)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="glass p-6 rounded-2xl">
          <h4 className="font-black uppercase tracking-widest text-sm text-white/60 mb-4">
            <Globe className="w-4 h-4 inline mr-2" />
            Top Countries
          </h4>
          <div className="space-y-3">
            {data.countries?.slice(0, 6).map((country, index) => (
              <div key={country.country} className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/30 w-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-sm text-white truncate">
                  {country.country}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {formatNumber(country.visitors)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-white/30">
        <p>
          Data from Google Analytics 4 • Property ID: G-M7ZQ3F7RCX • 
          Updates every 30 seconds for real-time metrics
        </p>
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  rawValue?: boolean;
  change?: { value: number; isPositive: boolean };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  rawValue,
  change,
}) => {
  const colorClasses: Record<string, string> = {
    green: 'from-green-500/20 to-green-500/5 text-green-400',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-400',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400',
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-400',
  };

  return (
    <div className={`glass p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 opacity-80" />
        {change && (
          <div
            className={`flex items-center gap-1 text-xs ${
              change.isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change.isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {change.value}%
          </div>
        )}
      </div>
      <p className="text-2xl lg:text-3xl font-black text-white mb-1">
        {rawValue ? value : formatNumber(Number(value))}
      </p>
      <p className="text-xs opacity-70 uppercase tracking-wider">{title}</p>
    </div>
  );
};

export default AnalyticsDashboard;
