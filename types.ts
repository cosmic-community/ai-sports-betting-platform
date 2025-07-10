// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Site Settings interface
interface SiteSettings extends CosmicObject {
  type_slug: 'site-settings';
  metadata: {
    hero_headline?: string;
    hero_subheadline?: string;
    hero_cta_text?: string;
    current_season_record?: string;
    season_roi?: string;
    win_rate?: string;
    subscription_price?: string;
    regular_price?: string;
    floating_button_text?: string;
    exit_intent_headline?: string;
    exit_intent_offer?: string;
    blog_cta_default?: string;
  };
}

// Blog Posts interface
interface BlogPost extends CosmicObject {
  type_slug: 'blog-posts';
  metadata: {
    headline?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    intro_preview?: string;
    full_content?: string;
    cta_text?: string;
    featured?: boolean;
    category?: {
      key: string;
      value: string;
    };
  };
}

// Betting Picks interface
interface BettingPick extends CosmicObject {
  type_slug: 'betting-picks';
  metadata: {
    game_title?: string;
    team_1?: string;
    team_2?: string;
    recommended_bet?: string;
    odds?: string;
    confidence_rating?: {
      key: string;
      value: string;
    };
    game_date?: string;
    analysis?: string;
    result?: {
      key: string;
      value: string;
    };
    premium_pick?: boolean;
  };
}

// Testimonials interface
interface Testimonial extends CosmicObject {
  type_slug: 'testimonials';
  metadata: {
    customer_name?: string;
    customer_image?: {
      url: string;
      imgix_url: string;
    };
    review_text?: string;
    star_rating?: {
      key: string;
      value: string;
    };
    profit_amount?: string;
    time_period?: string;
    featured?: boolean;
  };
}

// Type literals for select-dropdown values
type ConfidenceRating = 'high' | 'medium' | 'low';
type PickResult = 'win' | 'loss' | 'push' | 'pending';
type StarRating = '1' | '2' | '3' | '4' | '5';
type BlogCategory = 'strategy' | 'analysis' | 'news' | 'ai-insights';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type_slug === 'site-settings';
}

function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type_slug === 'blog-posts';
}

function isBettingPick(obj: CosmicObject): obj is BettingPick {
  return obj.type_slug === 'betting-picks';
}

function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type_slug === 'testimonials';
}

// Form types
interface SubscriptionFormData {
  email: string;
  name?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Component prop types
interface HeroProps {
  siteSettings: SiteSettings;
}

interface BlogCardProps {
  post: BlogPost;
  isPreview?: boolean;
}

interface PickCardProps {
  pick: BettingPick;
  showAnalysis?: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Export all types
export type {
  CosmicObject,
  SiteSettings,
  BlogPost,
  BettingPick,
  Testimonial,
  ConfidenceRating,
  PickResult,
  StarRating,
  BlogCategory,
  CosmicResponse,
  SubscriptionFormData,
  ContactFormData,
  HeroProps,
  BlogCardProps,
  PickCardProps,
  TestimonialCardProps,
};

export {
  isSiteSettings,
  isBlogPost,
  isBettingPick,
  isTestimonial,
};