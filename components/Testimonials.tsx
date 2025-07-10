'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-dark-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              What Our Users Say
            </h2>
            <p className="text-gray-300">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-dark-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of profitable bettors who trust our AI predictions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:bg-dark-800/70 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < parseInt(testimonial.metadata?.star_rating?.key || '5')
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-300 mb-6 italic">
                "{testimonial.metadata?.review_text || 'Great service!'}"
              </blockquote>

              {/* Profit Highlight */}
              {testimonial.metadata?.profit_amount && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold">
                      {testimonial.metadata.profit_amount}
                    </span>
                    {testimonial.metadata?.time_period && (
                      <span className="text-gray-400 text-sm">
                        {testimonial.metadata.time_period}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center space-x-3">
                {testimonial.metadata?.customer_image ? (
                  <img
                    src={`${testimonial.metadata.customer_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={testimonial.metadata?.customer_name || 'Customer'}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.metadata?.customer_name?.charAt(0) || 'A'}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium text-white">
                    {testimonial.metadata?.customer_name || 'Anonymous'}
                  </div>
                  <div className="text-sm text-gray-400">Verified Customer</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">0</div>
            <div className="text-gray-400">Complaints</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">88%</div>
            <div className="text-gray-400">Return Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}