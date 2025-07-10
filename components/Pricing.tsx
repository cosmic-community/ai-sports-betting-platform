'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { SiteSettings } from '@/types';

interface PricingProps {
  siteSettings: SiteSettings;
}

export default function Pricing({ siteSettings }: PricingProps) {
  const features = [
    'Weekly AI-powered picks',
    'Detailed analysis for each pick',
    'Real-time notifications',
    'Bankroll management tools',
    'Historical performance data',
    'Mobile app access',
    'Expert support',
    'Money-back guarantee',
  ];

  return (
    <section id="pricing" className="py-20 bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get full access to our AI-powered betting picks for one low price
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-dark-800/50 backdrop-blur-sm border border-primary/50 rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-bl-lg font-semibold text-sm">
              Most Popular
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Full Season Access
              </h3>
              <p className="text-gray-400">
                Everything you need to win consistently
              </p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-2">
                {siteSettings.metadata?.regular_price && (
                  <span className="text-2xl text-gray-500 line-through mr-3">
                    {siteSettings.metadata.regular_price}
                  </span>
                )}
                <span className="text-5xl font-bold text-white">
                  {siteSettings.metadata?.subscription_price || '$199'}
                </span>
              </div>
              <p className="text-gray-400">
                One-time payment • Full season access
              </p>
              {siteSettings.metadata?.regular_price && (
                <div className="mt-2 text-green-400 font-semibold">
                  Save {parseInt(siteSettings.metadata.regular_price.replace('$', '')) - parseInt(siteSettings.metadata.subscription_price?.replace('$', '') || '199')}!
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              {siteSettings.metadata?.hero_cta_text || 'Get Started Now'}
            </motion.button>

            {/* Guarantee */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <Star className="h-4 w-4" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Join 1,000+ profitable bettors who trust our AI predictions
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">68%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">+32.7%</div>
              <div className="text-sm text-gray-400">ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">118-52-3</div>
              <div className="text-sm text-gray-400">Season Record</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}