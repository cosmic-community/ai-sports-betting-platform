import { createBucketClient } from '@cosmicjs/sdk';
import { 
  SiteSettings, 
  BlogPost, 
  BettingPick, 
  Testimonial, 
  CosmicResponse 
} from '@/types';

// Initialize Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings',
      slug: 'site-configuration'
    });
    
    return response.object as SiteSettings;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch site settings');
  }
}

// Fetch blog posts
export async function getBlogPosts(limit: number = 10): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'blog-posts'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit);
    
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch blog posts');
  }
}

// Fetch single blog post
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'blog-posts',
      slug
    }).depth(1);
    
    const post = response.object as BlogPost;
    
    if (!post || !post.metadata) {
      return null;
    }
    
    return post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch blog post');
  }
}

// Fetch betting picks
export async function getBettingPicks(limit: number = 10): Promise<BettingPick[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'betting-picks'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit);
    
    return response.objects as BettingPick[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch betting picks');
  }
}

// Fetch featured testimonials
export async function getFeaturedTestimonials(limit: number = 3): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'testimonials',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit);
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Fetch all testimonials
export async function getTestimonials(limit: number = 10): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'testimonials'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit);
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Add newsletter subscription
export async function addNewsletterSubscription(email: string, name?: string): Promise<boolean> {
  try {
    await cosmic.objects.insertOne({
      type: 'newsletter-subscriptions',
      title: `Newsletter Subscription - ${email}`,
      slug: `newsletter-${Date.now()}`,
      metadata: {
        email,
        name: name || '',
        subscribed_at: new Date().toISOString(),
        status: 'active'
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error adding newsletter subscription:', error);
    return false;
  }
}