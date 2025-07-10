'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '@/types';
import Link from 'next/link';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) {
    return (
      <section id="blog" className="py-20 bg-dark-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Latest Insights
            </h2>
            <p className="text-gray-300">No blog posts available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Deep dive into betting strategies, AI analysis, and market insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl overflow-hidden hover:bg-dark-800/70 transition-all duration-300 group"
            >
              {/* Featured Image */}
              {post.metadata?.cover_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`${post.metadata.cover_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                    alt={post.metadata.headline || post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Category */}
                {post.metadata?.category && (
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="h-4 w-4 text-primary-400" />
                    <span className="text-sm font-medium text-primary-400">
                      {post.metadata.category.value}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">
                  {post.metadata?.headline || post.title}
                </h3>

                {/* Preview */}
                {post.metadata?.intro_preview && (
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.metadata.intro_preview}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}