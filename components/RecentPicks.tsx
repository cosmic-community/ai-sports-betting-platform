'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Star } from 'lucide-react';
import { BettingPick } from '@/types';

interface RecentPicksProps {
  picks: BettingPick[];
}

export default function RecentPicks({ picks }: RecentPicksProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case 'win': return 'text-green-400 bg-green-400/20';
      case 'loss': return 'text-red-400 bg-red-400/20';
      case 'push': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (!picks || picks.length === 0) {
    return (
      <section id="picks" className="py-20 bg-dark-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Recent AI Picks
            </h2>
            <p className="text-gray-300">No picks available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="picks" className="py-20 bg-dark-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Recent AI Picks
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See our latest AI-generated betting predictions with detailed analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {picks.map((pick, index) => (
            <motion.div
              key={pick.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:bg-dark-800/70 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {pick.metadata?.game_date ? new Date(pick.metadata.game_date).toLocaleDateString() : 'TBD'}
                  </span>
                </div>
                {pick.metadata?.premium_pick && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs font-medium">Premium</span>
                  </div>
                )}
              </div>

              {/* Game Title */}
              <h3 className="text-lg font-semibold mb-2 text-white">
                {pick.metadata?.game_title || pick.title}
              </h3>

              {/* Recommendation */}
              <div className="bg-dark-700/50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Recommendation</span>
                  <span className="text-sm font-medium text-primary-400">
                    {pick.metadata?.odds || 'N/A'}
                  </span>
                </div>
                <div className="text-lg font-semibold text-white mt-1">
                  {pick.metadata?.recommended_bet || 'N/A'}
                </div>
              </div>

              {/* Analysis Preview */}
              {pick.metadata?.analysis && (
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {pick.metadata.analysis}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {pick.metadata?.confidence_rating && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(pick.metadata.confidence_rating.value)}`}>
                      {pick.metadata.confidence_rating.value} Confidence
                    </span>
                  )}
                </div>
                {pick.metadata?.result && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(pick.metadata.result.value)}`}>
                    {pick.metadata.result.value}
                  </span>
                )}
              </div>
            </motion.div>
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
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Get All Premium Picks
          </button>
        </motion.div>
      </div>
    </section>
  );
}