'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { SiteSettings } from '@/types';
import SubscriptionModal from './SubscriptionModal';

interface FloatingCTAProps {
  siteSettings: SiteSettings;
}

export default function FloatingCTA({ siteSettings }: FloatingCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 bg-dark-600 text-white rounded-full p-1 hover:bg-dark-500 transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-3 w-3" />
          </button>

          {/* Main CTA Button */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
          >
            <Zap className="h-5 w-5" />
            <span>{siteSettings.metadata?.floating_button_text || 'Get Free Picks'}</span>
          </motion.button>

          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
        </div>
      </motion.div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        siteSettings={siteSettings}
      />
    </>
  );
}