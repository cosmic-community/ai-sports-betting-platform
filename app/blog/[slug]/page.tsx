// app/blog/[slug]/page.tsx
import { getBlogPost, getSiteSettings } from '@/lib/cosmic';
import { BlogPost, SiteSettings } from '@/types';
import { notFound } from 'next/navigation';
import BlogNavigation from '@/components/BlogNavigation';
import SubscriptionGate from '@/components/SubscriptionGate';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  let siteSettings: SiteSettings | null = null;
  
  try {
    [post, siteSettings] = await Promise.all([
      getBlogPost(slug),
      getSiteSettings()
    ]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const imageUrl = post.metadata?.cover_image?.imgix_url;
  const headline = post.metadata?.headline || post.title;
  const excerpt = post.metadata?.intro_preview || '';
  const fullContent = post.metadata?.full_content || '';
  const category = post.metadata?.category;
  const ctaText = post.metadata?.cta_text || siteSettings?.metadata?.blog_cta_default || 'Unlock Full Analysis - Subscribe Now';
  
  const readTime = Math.ceil((excerpt.length + fullContent.length) / 1000);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <BlogNavigation currentPage="blog" />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to blog */}
        <Link 
          href="/blog"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Meta */}
        <div className="mb-8">
          {/* Category */}
          {category && (
            <div className="mb-4">
              <span className="inline-flex items-center space-x-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 px-3 py-1 rounded-full text-sm font-medium">
                <Tag className="h-3 w-3" />
                <span>{typeof category === 'string' ? category : category.value || category.title}</span>
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {excerpt}
            </p>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
            <button className="flex items-center space-x-2 hover:text-white transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <div className="mb-12">
            <img 
              src={`${imageUrl}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={headline}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12">
          {/* Preview content (intro) */}
          {excerpt && (
            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <p className="text-lg leading-relaxed text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {excerpt}
              </p>
            </div>
          )}

          {/* Subscription Gate for full content */}
          {fullContent && (
            <SubscriptionGate content={fullContent} ctaText={ctaText} />
          )}

          {/* No content available */}
          {!excerpt && !fullContent && (
            <div className="text-center py-12">
              <p className="text-gray-400">No content available for this article.</p>
            </div>
          )}
        </div>

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Tags or categories could go here */}
            <div className="flex items-center space-x-4">
              {post.metadata?.featured && (
                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-medium">
                  Featured Article
                </span>
              )}
            </div>

            {/* Social sharing */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Share this article:</span>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72c-.95.56-2 .96-3.12 1.19a4.92 4.92 0 00-8.38 4.48A13.94 13.94 0 011.64 3.16a4.82 4.82 0 00-.66 2.47c0 1.71.87 3.21 2.19 4.09a4.9 4.9 0 01-2.23-.61v.07a4.93 4.93 0 003.95 4.83 4.93 4.93 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.86 9.86 0 010 19.54a13.94 13.94 0 007.55 2.21c9.05 0 14-7.5 14-13.98 0-.21 0-.42-.01-.62A9.94 9.94 0 0024 4.59l-.05-.02z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.45 2H3.55A1.55 1.55 0 002 3.55v16.9A1.55 1.55 0 003.55 22h16.9a1.55 1.55 0 001.55-1.55V3.55A1.55 1.55 0 0020.45 2zM8.75 18.5H6.5V9h2.25v9.5zM7.625 8.125a1.375 1.375 0 110-2.75 1.375 1.375 0 010 2.75zM18.5 18.5h-2.25v-4.75c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25v4.75H11.5V9h2.25v1.25c.5-.69 1.31-1.25 2.25-1.25 1.38 0 2.5 1.12 2.5 2.5v7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to return to blog */}
        <div className="mt-12 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>More Articles</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  return [];
}