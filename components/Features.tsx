'use client';

import { motion } from 'framer-motion';
import { Brain, Clock, Target, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Analysis',
      description: 'Our machine learning algorithms analyze thousands of data points to identify profitable betting opportunities.',
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Get picks delivered instantly as our AI identifies new opportunities in the betting markets.',
      color: 'from-green-500 to-teal-600',
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Our AI consistently delivers winning picks with a documented track record of success.',
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: TrendingUp,
      title: 'Proven ROI',
      description: 'Join thousands of profitable bettors who trust our AI-powered predictions.',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Built-in bankroll management and risk assessment to protect your investments.',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Easy to Use',
      description: 'No complex analysis required. Get clear, actionable picks delivered to your inbox.',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Why Choose AI Sports Betting?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our advanced AI system gives you the edge you need to beat the sportsbooks consistently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:bg-dark-800/70 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}