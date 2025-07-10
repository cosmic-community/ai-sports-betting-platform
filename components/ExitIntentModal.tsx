'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { SiteSettings } from '@/types';
import SubscriptionModal from './SubscriptionModal';

interface ExitIntentModalProps {
  siteSettings: SiteSettings;
}

export default function ExitIntentModal({ siteSettings }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  useEffect(() => {
    let hasShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        hasShown = true;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubscribe = () => {
    setIsVisible(false);
    setIsSubscriptionModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-2xl p-8 max-w-md w-full mx-4 relative"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <Gift className="h-12 w-12 text-primary" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  {siteSettings.metadata?.exit_intent_headline || 'Wait! Get 3 Free AI Picks Before You Go'}
                </h2>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {siteSettings.metadata?.exit_intent_offer || 'Don\'t miss out! Enter your email and we\'ll send you 3 high-confidence AI picks for this weekend\'s games - completely free. No strings attached.'}
                </p>

                <div className="space-y-4">
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Get My Free Picks
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="w-full text-gray-400 hover:text-white transition-colors"
                  >
                    No thanks, I'll pass
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        siteSettings={siteSettings}
      />
    </>
  );
}