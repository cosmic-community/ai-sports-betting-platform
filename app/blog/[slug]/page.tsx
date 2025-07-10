// app/blog/[slug]/page.tsx
import { getBlogPost } from '@/lib/cosmic';
import { BlogPost } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  
  try {
    post = await getBlogPost(slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            {post.metadata?.author && (
              <div className="flex items-center space-x-2">
                {post.metadata.author.metadata?.avatar && (
                  <img 
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="text-sm text-blue-100">
                  {post.metadata.author.title}
                </span>
              </div>
            )}
            <span className="text-sm text-blue-200">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            {post.metadata?.category && (
              <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                {post.metadata.category.title}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          
          {(post.metadata?.excerpt || post.metadata?.intro_preview) && (
            <p className="text-xl text-blue-100 leading-relaxed">
              {post.metadata.excerpt || post.metadata.intro_preview}
            </p>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {(post.metadata?.featured_image || post.metadata?.cover_image) && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <img 
            src={`${(post.metadata.featured_image || post.metadata.cover_image)?.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          {post.metadata?.content && (
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          )}
          
          {post.metadata?.body && (
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.metadata.body }}
            />
          )}
          
          {/* Tags */}
          {post.metadata?.tags && post.metadata.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  return [];
}