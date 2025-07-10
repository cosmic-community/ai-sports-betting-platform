'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = post.metadata?.cover_image?.imgix_url;
  const headline = post.metadata?.headline || post.title;
  const excerpt = post.metadata?.intro_preview || '';
  const category = post.metadata?.category;
  const readTime = Math.ceil((excerpt.length + (post.metadata?.full_content?.length || 0)) / 1000);

  return (
    <article 
      className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Featured Image */}
      {imageUrl && (
        <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-video'}`}>
          <img
            src={`${imageUrl}?w=${featured ? '1200' : '800'}&h=${featured ? '600' : '450'}&fit=crop&auto=format,compress`}
            alt={headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          
          {/* Category badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center space-x-1 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                <Tag className="h-3 w-3" />
                <span>{typeof category === 'string' ? category : category.value || category.title}</span>
              </span>
            </div>
          )}
          
          {/* Featured badge */}
          {post.metadata?.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-500/90 backdrop-blur-sm text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        {/* Meta information */}
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h2 className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {headline}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className={`text-gray-300 mb-4 leading-relaxed ${
            featured ? 'text-lg line-clamp-3' : 'line-clamp-2'
          }`}>
            {excerpt}
          </p>
        )}

        {/* Read more link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          <span>Read full article</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  );
}