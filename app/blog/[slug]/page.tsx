// app/blog/[slug]/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getSiteSettings } from '@/lib/cosmic';
import BlogNavigation from '@/components/BlogNavigation';
import SubscriptionGate from '@/components/SubscriptionGate';
import { BlogPost } from '@/types';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    const title = post.metadata.headline || post.title;
    const description = post.metadata.intro_preview || 'Read our latest insights on AI sports betting.';
    const imageUrl = post.metadata.cover_image?.imgix_url 
      ? `${post.metadata.cover_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      : null;

    return {
      title: `${title} | AI Sports Betting`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post | AI Sports Betting',
      description: 'Read our latest insights on AI sports betting.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const [post, siteSettings] = await Promise.all([
      getBlogPost(slug),
      getSiteSettings(),
    ]);

    if (!post) {
      notFound();
    }

    // Safe category display
    const getCategoryDisplay = (category?: { key: string; value: string }): string => {
      if (!category) return '';
      return category.value || '';
    };

    // Safe image URL
    const getImageUrl = (image?: { url: string; imgix_url: string }): string => {
      if (!image?.imgix_url) return '';
      return `${image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`;
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <BlogNavigation />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Cover Image */}
            {post.metadata.cover_image && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={getImageUrl(post.metadata.cover_image)}
                  alt={post.metadata.headline || post.title}
                  className="w-full h-full object-cover"
                />
                {post.metadata.category && (
                  <div className="absolute top-6 left-6">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {getCategoryDisplay(post.metadata.category)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Article Content */}
            <div className="p-8">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.metadata.headline || post.title}
                </h1>
                
                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.metadata.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </header>

              {/* Intro Preview */}
              {post.metadata.intro_preview && (
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {post.metadata.intro_preview}
                  </p>
                </div>
              )}

              {/* Subscription Gate with Full Content */}
              <SubscriptionGate
                fullContent={post.metadata.full_content || post.content || ''}
                ctaText={post.metadata.cta_text || siteSettings?.metadata.blog_cta_default || 'Subscribe to Read More'}
              />
            </div>
          </article>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}

// Loading component
function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogNavigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="h-64 md:h-96 bg-gray-300"></div>
          <div className="p-8">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
            <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}