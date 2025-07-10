'use client';

import { useState } from 'react';
import { Lock, Star, CheckCircle, X } from 'lucide-react';

interface SubscriptionGateProps {
  content: string;
  ctaText?: string;
  children?: React.ReactNode;
}

export default function SubscriptionGate({ 
  content, 
  ctaText = "Unlock Full Analysis - Subscribe Now",
  children 
}: SubscriptionGateProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    // Simulate subscription process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubscribed(true);
    setIsSubscribing(false);
    
    // Close modal after success
    setTimeout(() => {
      setShowModal(false);
      setSubscribed(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Preview content (first paragraph) */}
      {children}

      {/* Blurred content */}
      <div className="relative mt-6">
        {/* Blur effect */}
        <div 
          className="prose prose-invert prose-lg max-w-none filter blur-sm select-none pointer-events-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        
        {/* Subscription CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-md mx-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              Premium Content
            </h3>
            
            <p className="text-gray-300 mb-6">
              Get access to our complete analysis, AI insights, and profitable betting strategies.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>AI Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Expert Picks</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              {ctaText}
            </button>
            
            <p className="text-xs text-gray-500 mt-3">
              Cancel anytime • 7-day money-back guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {!subscribed ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Subscribe for Full Access
                  </h2>
                  <p className="text-gray-300">
                    Join thousands of profitable bettors using our AI system
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      'Subscribe Now - $199/month'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By subscribing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to the Club!
                </h2>
                <p className="text-gray-300">
                  Check your email for access instructions and your first AI picks.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}