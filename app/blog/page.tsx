import { getBlogPosts, getSiteSettings } from '@/lib/cosmic';
import { BlogPost, SiteSettings } from '@/types';
import BlogNavigation from '@/components/BlogNavigation';
import BlogCard from '@/components/BlogCard';

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let siteSettings: SiteSettings | null = null;
  
  try {
    [posts, siteSettings] = await Promise.all([
      getBlogPosts(20),
      getSiteSettings()
    ]);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    posts = [];
    siteSettings = null;
  }

  // Separate featured and regular posts
  const featuredPosts = posts.filter(post => post.metadata?.featured);
  const regularPosts = posts.filter(post => !post.metadata?.featured);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <BlogNavigation currentPage="blog" />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sports Betting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Intelligence</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Deep insights, AI analysis, and proven strategies from the most profitable sports betting system in the industry
          </p>
          
          {/* Stats */}
          {siteSettings?.metadata && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {siteSettings.metadata.win_rate}
                </div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {siteSettings.metadata.season_roi}
                </div>
                <div className="text-sm text-gray-400">Season ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {siteSettings.metadata.current_season_record}
                </div>
                <div className="text-sm text-gray-400">Record</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">
              No articles published yet
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Our team is working on bringing you the latest insights and strategies. Check back soon for expert analysis!
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      featured={true}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      featured={false}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}