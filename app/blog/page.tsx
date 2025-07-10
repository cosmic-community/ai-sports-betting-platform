import { getBlogPosts } from '@/lib/cosmic';
import { BlogPost } from '@/types';
import Link from 'next/link';

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  
  try {
    posts = await getBlogPosts(20); // Fetch up to 20 posts
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    posts = [];
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sports Betting Blog
          </h1>
          <p className="text-xl text-blue-100">
            Expert insights, strategies, and analysis to improve your betting game
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">
              No blog posts yet
            </h2>
            <p className="text-gray-400">
              Check back soon for expert sports betting insights and strategies!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {post.metadata?.author && (
                      <div className="flex items-center space-x-2">
                        {post.metadata.author.metadata?.avatar && (
                          <img 
                            src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                            alt={post.metadata.author.title}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <span className="text-sm text-gray-400">
                          {post.metadata.author.title}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {post.metadata?.category && (
                    <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm">
                      {post.metadata.category.title}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                {(post.metadata?.excerpt || post.metadata?.intro_preview) && (
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.metadata.excerpt || post.metadata.intro_preview}
                  </p>
                )}
                
                {(post.metadata?.featured_image || post.metadata?.cover_image) && (
                  <div className="mb-6">
                    <img 
                      src={`${(post.metadata.featured_image || post.metadata.cover_image)?.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Read full article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  {post.metadata?.tags && post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.tags.map((tag: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}