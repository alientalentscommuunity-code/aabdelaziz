// Google Analytics 4 / GTM Tracking Utility
// Provides comprehensive tracking for all user interactions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// GA4 Event Names
export const GA_EVENTS = {
  // Page Views
  PAGE_VIEW: 'page_view',
  
  // Engagement
  CLICK: 'click',
  SCROLL: 'scroll',
  ENGAGEMENT: 'user_engagement',
  
  // Navigation
  NAV_CLICK: 'nav_click',
  TAB_CLICK: 'tab_click',
  
  // Forms
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  
  // Content
  CONTENT_VIEW: 'content_view',
  EXPAND: 'expand',
  COLLAPSE: 'collapse',
  
  // Portfolio Specific
  PROJECT_VIEW: 'project_view',
  PROJECT_CLICK: 'project_click',
  CV_DOWNLOAD: 'cv_download',
  
  // Admin
  ADMIN_LOGIN: 'admin_login',
  ADMIN_ACTION: 'admin_action',
  
  // Vision Board & Blog
  VISION_CREATE: 'vision_create',
  VISION_UPDATE: 'vision_update',
  BLOG_CREATE: 'blog_create',
  BLOG_UPDATE: 'blog_update',
  
  // External Links
  OUTBOUND_CLICK: 'outbound_click',
  SOCIAL_CLICK: 'social_click',
  
  // Search
  SEARCH: 'search',
  
  // Errors
  ERROR: 'error',
  EXCEPTION: 'exception',
} as const;

// GA4 Custom Parameters
export interface GAEventParams {
  // Page
  page_title?: string;
  page_location?: string;
  page_path?: string;
  
  // Element
  element_id?: string;
  element_class?: string;
  element_text?: string;
  element_url?: string;
  
  // Navigation
  nav_item?: string;
  nav_section?: string;
  
  // Form
  form_id?: string;
  form_name?: string;
  form_step?: number;
  form_error?: string;
  
  // Content
  content_type?: string;
  content_id?: string;
  content_name?: string;
  content_category?: string;
  
  // Project/Vision/Blog
  project_name?: string;
  project_category?: string;
  vision_title?: string;
  post_title?: string;
  
  // Persona (for request form)
  persona?: string;
  purpose?: string;
  
  // Engagement
  engagement_time?: number;
  scroll_depth?: number;
  
  // Status
  status?: string;
  success?: boolean;
  
  // Search
  search_term?: string;
  
  // Error
  error_message?: string;
  error_type?: string;
  
  // Custom
  [key: string]: any;
}

/**
 * Send event to Google Analytics 4
 */
export const gtagEvent = (eventName: string, params?: GAEventParams): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      send_to: 'G-M7ZQ3F7RCX',
      event_timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track page view for SPA navigation
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: path,
      send_to: 'G-M7ZQ3F7RCX',
    });
  }
};

/**
 * Track navigation click
 */
export const trackNavClick = (navItem: string, section?: string): void => {
  gtagEvent(GA_EVENTS.NAV_CLICK, {
    nav_item: navItem,
    nav_section: section || 'main',
    element_text: navItem,
  });
};

/**
 * Track button click
 */
export const trackButtonClick = (
  buttonText: string,
  buttonId?: string,
  location?: string
): void => {
  gtagEvent(GA_EVENTS.CLICK, {
    element_text: buttonText,
    element_id: buttonId,
    content_category: location || 'general',
  });
};

/**
 * Track form interactions
 */
export const trackFormStart = (formName: string, formId?: string): void => {
  gtagEvent(GA_EVENTS.FORM_START, {
    form_name: formName,
    form_id: formId || formName,
  });
};

export const trackFormSubmit = (
  formName: string,
  success: boolean,
  data?: GAEventParams
): void => {
  gtagEvent(GA_EVENTS.FORM_SUBMIT, {
    form_name: formName,
    success,
    ...data,
  });
};

export const trackFormError = (
  formName: string,
  errorMessage: string,
  field?: string
): void => {
  gtagEvent(GA_EVENTS.FORM_ERROR, {
    form_name: formName,
    form_error: errorMessage,
    error_type: field ? `field_${field}` : 'general',
    error_message: errorMessage,
  });
};

/**
 * Track content view
 */
export const trackContentView = (
  contentType: string,
  contentName: string,
  contentId?: string,
  category?: string
): void => {
  gtagEvent(GA_EVENTS.CONTENT_VIEW, {
    content_type: contentType,
    content_name: contentName,
    content_id: contentId,
    content_category: category,
  });
};

/**
 * Track project view/click
 */
export const trackProjectView = (
  projectName: string,
  projectCategory: string,
  status: 'live' | 'demo'
): void => {
  gtagEvent(GA_EVENTS.PROJECT_VIEW, {
    project_name: projectName,
    project_category: projectCategory,
    status,
  });
};

export const trackProjectClick = (
  projectName: string,
  linkType: 'live' | 'demo'
): void => {
  gtagEvent(GA_EVENTS.PROJECT_CLICK, {
    project_name: projectName,
    link_type: linkType,
    outbound: true,
  });
};

/**
 * Track external/outbound links
 */
export const trackOutboundClick = (
  url: string,
  linkText?: string,
  category?: string
): void => {
  gtagEvent(GA_EVENTS.OUTBOUND_CLICK, {
    element_url: url,
    element_text: linkText,
    content_category: category || 'external',
    outbound: true,
  });
};

export const trackSocialClick = (platform: string, url: string): void => {
  gtagEvent(GA_EVENTS.SOCIAL_CLICK, {
    platform,
    element_url: url,
    content_category: 'social',
    outbound: true,
  });
};

/**
 * Track CV download
 */
export const trackCVDownload = (format: 'pdf' | 'docx' | 'view'): void => {
  gtagEvent(GA_EVENTS.CV_DOWNLOAD, {
    format,
    content_category: 'career',
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultsCount?: number): void => {
  gtagEvent(GA_EVENTS.SEARCH, {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track tab change
 */
export const trackTabClick = (tabName: string, section: string): void => {
  gtagEvent(GA_EVENTS.TAB_CLICK, {
    nav_item: tabName,
    nav_section: section,
  });
};

/**
 * Track expand/collapse
 */
export const trackExpand = (contentType: string, contentName: string): void => {
  gtagEvent(GA_EVENTS.EXPAND, {
    content_type: contentType,
    content_name: contentName,
  });
};

export const trackCollapse = (contentType: string, contentName: string): void => {
  gtagEvent(GA_EVENTS.COLLAPSE, {
    content_type: contentType,
    content_name: contentName,
  });
};

/**
 * Track admin actions
 */
export const trackAdminLogin = (success: boolean, method?: string): void => {
  gtagEvent(GA_EVENTS.ADMIN_LOGIN, {
    success,
    method: method || 'email',
  });
};

export const trackAdminAction = (
  action: string,
  entityType: string,
  entityId?: string
): void => {
  gtagEvent(GA_EVENTS.ADMIN_ACTION, {
    action,
    content_type: entityType,
    content_id: entityId,
  });
};

/**
 * Track Vision Board actions
 */
export const trackVisionAction = (
  action: 'create' | 'update' | 'delete',
  visionTitle: string,
  category?: string
): void => {
  const eventName = action === 'create' ? GA_EVENTS.VISION_CREATE : 
                    action === 'update' ? GA_EVENTS.VISION_UPDATE : 'vision_delete';
  gtagEvent(eventName, {
    vision_title: visionTitle,
    content_category: category,
    action,
  });
};

/**
 * Track Blog actions
 */
export const trackBlogAction = (
  action: 'create' | 'update' | 'delete',
  postTitle: string,
  category?: string
): void => {
  const eventName = action === 'create' ? GA_EVENTS.BLOG_CREATE : 
                    action === 'update' ? GA_EVENTS.BLOG_UPDATE : 'blog_delete';
  gtagEvent(eventName, {
    post_title: postTitle,
    content_category: category,
    action,
  });
};

/**
 * Track errors
 */
export const trackError = (
  errorMessage: string,
  errorType: string,
  context?: string
): void => {
  gtagEvent(GA_EVENTS.ERROR, {
    error_message: errorMessage,
    error_type: errorType,
    content_category: context || 'general',
  });
};

/**
 * Track exceptions
 */
export const trackException = (
  description: string,
  fatal: boolean = false,
  context?: string
): void => {
  gtagEvent(GA_EVENTS.EXCEPTION, {
    description,
    fatal,
    content_category: context || 'javascript',
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number): void => {
  gtagEvent(GA_EVENTS.SCROLL, {
    scroll_depth: depth,
    percent_scrolled: depth,
  });
};

/**
 * Track user engagement time
 */
export const trackEngagement = (engagementTimeMs: number): void => {
  gtagEvent(GA_EVENTS.ENGAGEMENT, {
    engagement_time: Math.round(engagementTimeMs / 1000), // Convert to seconds
  });
};

/**
 * Track persona selection (for request form)
 */
export const trackPersonaSelect = (persona: string, purpose: string): void => {
  gtagEvent('persona_select', {
    persona,
    purpose,
    content_category: 'request_form',
  });
};

/**
 * Universal click tracker - can be used for any element
 */
export const trackElementClick = (
  element: HTMLElement,
  customParams?: GAEventParams
): void => {
  const text = element.innerText?.substring(0, 100) || element.getAttribute('aria-label') || 'unknown';
  const id = element.id || undefined;
  const className = element.className || undefined;
  const href = element.getAttribute('href') || undefined;
  
  gtagEvent(GA_EVENTS.CLICK, {
    element_text: text,
    element_id: id,
    element_class: className,
    element_url: href,
    ...customParams,
  });
};

// Default export
const analytics = {
  gtagEvent,
  trackPageView,
  trackNavClick,
  trackButtonClick,
  trackFormStart,
  trackFormSubmit,
  trackFormError,
  trackContentView,
  trackProjectView,
  trackProjectClick,
  trackOutboundClick,
  trackSocialClick,
  trackCVDownload,
  trackSearch,
  trackTabClick,
  trackExpand,
  trackCollapse,
  trackAdminLogin,
  trackAdminAction,
  trackVisionAction,
  trackBlogAction,
  trackError,
  trackException,
  trackScrollDepth,
  trackEngagement,
  trackPersonaSelect,
  trackElementClick,
  GA_EVENTS,
};

export default analytics;
