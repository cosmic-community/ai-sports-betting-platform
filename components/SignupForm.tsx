'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Check, 
  ArrowLeft,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { SiteSettings } from '@/types';
import Link from 'next/link';

interface SignupFormProps {
  siteSettings: SiteSettings;
}

export default function SignupForm({ siteSettings }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    paymentMethod: 'card',
    saveInfo: false,
    phone: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would integrate with your payment processor (Stripe, etc.)
    console.log('Processing payment for:', formData);
    
    setIsProcessing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const productFeatures = [
    'Full access to Dimers Platinum AI Picks',
    'College Football predictions for entire season',
    'Real-time updates and alerts',
    'Historical performance tracking',
    'Money-back guarantee',
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column - Product Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-8"
      >
        {/* Product Header */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
            <Zap className="h-6 w-6 text-primary-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Dimers Platinum AI Bets CFB 2025
            </h3>
            <p className="text-sm text-gray-400">
              EARLY BIRD PRICE: Full access to Dimers Platinum AI Picks
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {productFeatures.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-dark-700/50 rounded-lg">
            <Target className="h-6 w-6 text-primary-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">68%</div>
            <div className="text-xs text-gray-400">Win Rate</div>
          </div>
          <div className="text-center p-4 bg-dark-700/50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">118-52-3</div>
            <div className="text-xs text-gray-400">Record</div>
          </div>
          <div className="text-center p-4 bg-dark-700/50 rounded-lg">
            <Zap className="h-6 w-6 text-primary-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">+32.7%</div>
            <div className="text-xs text-gray-400">ROI</div>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-dark-700 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white font-semibold">
              {siteSettings.metadata?.subscription_price || '$279.00'}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Tax</span>
            <span className="text-gray-400">Enter address to calculate</span>
          </div>
          <div className="border-t border-dark-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">Total due</span>
              <span className="text-lg font-bold text-white">
                {siteSettings.metadata?.subscription_price || '$279.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Add promotion code */}
        <button className="text-primary-400 text-sm hover:text-primary-300 transition-colors mt-4">
          Add promotion code
        </button>
      </motion.div>

      {/* Right Column - Payment Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl p-8"
      >
        {/* Back Button */}
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to homepage
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Payment method
            </label>
            
            <div className="space-y-3">
              {/* Card Payment */}
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="mr-4"
                />
                <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Card</span>
                <div className="ml-auto flex space-x-2">
                  {/* Visa Icon */}
                  <svg className="h-6 w-8" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                    <path d="M18.5 11.5L15.5 20.5H13L11.5 14.5C11.4 14.1 11.2 13.8 10.9 13.6C10.2 13.2 9.4 12.9 8.5 12.7V12.5H12.5C13.1 12.5 13.6 12.9 13.7 13.5L14.5 17.5L16.5 12.5H18.5ZM22.5 12.5L20.5 20.5H18.5L20.5 12.5H22.5ZM29.5 13.5C29.5 12.9 29.1 12.5 28.5 12.5C27.9 12.5 27.3 12.7 26.8 13L26.5 12.5H25L27 16.5L25 20.5H27L28.5 18L30 20.5H32L29.5 16.5C29.5 16.5 29.5 13.5 29.5 13.5ZM38.5 12.5L37 20.5H35L33.5 12.5H35L36 17.5L37.5 12.5H38.5Z" fill="white"/>
                  </svg>
                  {/* Mastercard Icon */}
                  <svg className="h-6 w-8" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#FF5A00"/>
                    <circle cx="18" cy="16" r="8" fill="#FF5A00"/>
                    <circle cx="30" cy="16" r="8" fill="#EB001B"/>
                    <path d="M24 9.5C26.5 11.5 26.5 20.5 24 22.5C21.5 20.5 21.5 11.5 24 9.5Z" fill="#FF5A00"/>
                  </svg>
                  {/* American Express Icon */}
                  <svg className="h-6 w-8" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#006FCF"/>
                    <path d="M10 12H14L16 16L18 12H22V20H20V14.5L18.5 17.5H15.5L14 14.5V20H10V12ZM24 12H32V14H26V15H31V17H26V18H32V20H24V12ZM34 12H38L40 16L42 12H46L42.5 16L46 20H42L40 16L38 20H34L37.5 16L34 12Z" fill="white"/>
                  </svg>
                </div>
              </label>

              {/* Other Payment Methods */}
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashapp"
                  checked={formData.paymentMethod === 'cashapp'}
                  onChange={handleInputChange}
                  className="mr-4"
                />
                <div className="w-5 h-5 bg-green-600 rounded mr-3"></div>
                <span className="text-gray-700">Cash App Pay</span>
              </label>

              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="afterpay"
                  checked={formData.paymentMethod === 'afterpay'}
                  onChange={handleInputChange}
                  className="mr-4"
                />
                <div className="w-5 h-5 bg-green-600 rounded mr-3"></div>
                <span className="text-gray-700">Afterpay</span>
              </label>
            </div>
          </div>

          {/* Save Information */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
              className="mt-1 mr-3"
            />
            <div>
              <label htmlFor="saveInfo" className="text-sm text-gray-700">
                Save my information for faster checkout
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Securely pay on Dimers and everywhere Link is accepted.
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone (optional)
            </label>
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                <span className="text-sm text-gray-600">🇺🇸</span>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="(201) 555-0123"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              `Subscribe ${siteSettings.metadata?.subscription_price || '$279.00'}`
            )}
          </motion.button>

          {/* Security Info */}
          <div className="flex items-center justify-center text-sm text-gray-600 mt-4">
            <Shield className="h-4 w-4 mr-2" />
            <span>Secured by industry-standard encryption</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}