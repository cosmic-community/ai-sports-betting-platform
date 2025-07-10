'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, Users } from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroProps {
  siteSettings: SiteSettings;
}

export default function Hero({ siteSettings }: HeroProps) {
  const stats = [
    {
      label: 'Win Rate',
      value: siteSettings.metadata?.win_rate || '68%',
      icon: Target,
    },
    {
      label: 'Season Record',
      value: siteSettings.metadata?.current_season_record || '118-52-3',
      icon: TrendingUp,
    },
    {
      label: 'ROI',
      value: siteSettings.metadata?.season_roi || '+32.7%',
      icon: Zap,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent"
          >
            {siteSettings.metadata?.hero_headline || 'AI Sports Betting That Actually Wins'}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {siteSettings.metadata?.hero_subheadline || 'Our advanced AI analyzes thousands of data points to deliver profitable betting picks. Join the smart money and start winning consistently.'}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:bg-dark-800/70 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              {siteSettings.metadata?.hero_cta_text || 'Get AI Picks Now'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/10 transition-colors w-full sm:w-auto"
            >
              See Past Results
            </motion.button>
          </motion.div>

          {/* Pricing Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-2">Limited Time Offer</p>
            <div className="text-3xl font-bold text-white">
              {siteSettings.metadata?.subscription_price || '$199'}
              {siteSettings.metadata?.regular_price && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  {siteSettings.metadata.regular_price}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Full season access • Money-back guarantee
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}