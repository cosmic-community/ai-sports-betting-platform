import Link from 'next/link';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  isPreview?: boolean;
}

export default function BlogCard({ post, isPreview = false }: BlogCardProps) {
  // Safe category display with proper typing
  const getCategoryDisplay = (category?: { key: string; value: string }): string => {
    if (!category) return '';
    return category.value || '';
  };

  // Safe image URL with optimization
  const getImageUrl = (image?: { url: string; imgix_url: string }): string => {
    if (!image?.imgix_url) return '';
    return `${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`;
  };

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Cover Image */}
      {post.metadata.cover_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={getImageUrl(post.metadata.cover_image)}
            alt={post.metadata.headline || post.title}
            className="w-full h-full object-cover"
          />
          {post.metadata.category && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {getCategoryDisplay(post.metadata.category)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Headline */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.metadata.headline || post.title}
          </Link>
        </h2>

        {/* Intro Preview */}
        {post.metadata.intro_preview && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.intro_preview}
          </p>
        )}

        {/* Read More Link */}
        <div className="flex items-center justify-between">
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read More
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>

          {/* Featured Badge */}
          {post.metadata.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
      </div>
    </article>
  );
}