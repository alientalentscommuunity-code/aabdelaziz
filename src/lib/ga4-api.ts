// Google Analytics 4 Data API Integration
// Fetches real-time and historical analytics data

export interface GA4Metrics {
  visitors: number;
  pageViews: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface PageViewData {
  page: string;
  views: number;
  visitors: number;
}

export interface EventData {
  eventName: string;
  count: number;
}

export interface DeviceData {
  device: string;
  sessions: number;
  percentage: number;
}

export interface CountryData {
  country: string;
  visitors: number;
}

export interface AnalyticsDashboardData {
  realtime: {
    activeUsers: number;
    topPages: { page: string; activeUsers: number }[];
  };
  today: GA4Metrics;
  last7Days: GA4Metrics;
  last30Days: GA4Metrics;
  topPages: PageViewData[];
  topEvents: EventData[];
  devices: DeviceData[];
  countries: CountryData[];
}

const GA4_PROPERTY_ID = "G-M7ZQ3F7RCX"; // Your GA4 Property ID

/**
 * Fetch analytics data from GA4 via Supabase Edge Function
 * This keeps credentials secure server-side
 */
export const fetchAnalyticsData = async (
  days: number = 7
): Promise<AnalyticsDashboardData | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ days }),
      }
    );

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return null;
  }
};

/**
 * Format duration from seconds to readable string
 */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Calculate percentage change
 */
export const calculateChange = (
  current: number,
  previous: number
): { value: number; isPositive: boolean } => {
  if (previous === 0) return { value: 0, isPositive: true };
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(Math.round(change)),
    isPositive: change >= 0,
  };
};
