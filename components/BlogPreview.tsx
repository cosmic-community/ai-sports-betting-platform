'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Expert analysis and betting strategies coming soon
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get featured posts and regular posts
  const featuredPosts = posts.filter(post => post.metadata?.featured).slice(0, 1);
  const regularPosts = posts.filter(post => !post.metadata?.featured).slice(0, 2);
  const displayPosts = [...featuredPosts, ...regularPosts].slice(0, 3);

  // Safe category display with proper typing
  const getCategoryDisplay = (category?: { key: string; value: string; title?: string }): string => {
    if (!category) return '';
    return category.title || category.value || '';
  };

  // Safe image URL with optimization
  const getImageUrl = (image?: { url: string; imgix_url: string }): string => {
    if (!image?.imgix_url) return '';
    return `${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`;
  };

  // Format date safely
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Insights</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert analysis, AI-powered strategies, and winning insights from the most profitable sports betting system
            </p>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
            >
              {/* Featured Image */}
              {post.metadata.cover_image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(post.metadata.cover_image)}
                    alt={post.metadata.headline || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  {post.metadata.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {getCategoryDisplay(post.metadata.category)}
                      </span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {post.metadata.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.metadata.headline || post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                {post.metadata.intro_preview && (
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.metadata.intro_preview}
                  </p>
                )}

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                >
                  Read Full Analysis
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}