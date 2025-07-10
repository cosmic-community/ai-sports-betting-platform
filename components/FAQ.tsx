'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does the AI sports betting system work?',
      answer: 'Our AI analyzes thousands of data points including team statistics, player performance, weather conditions, historical matchups, and betting line movements. It uses machine learning algorithms to identify patterns and predict outcomes with high accuracy.',
    },
    {
      question: 'What sports do you cover?',
      answer: 'We currently focus on college football and NFL with plans to expand to NBA, MLB, and soccer. Our AI specializes in these sports to provide the most accurate predictions possible.',
    },
    {
      question: 'How often do you provide picks?',
      answer: 'We provide picks for every major game during the season. Typically, this means 10-15 picks per week during peak season, with additional picks for playoffs and championship games.',
    },
    {
      question: 'What is your win rate?',
      answer: 'Our documented win rate is 68% over the past three seasons. We maintain transparent records of all our picks and results, which you can verify in your member dashboard.',
    },
    {
      question: 'Do you offer a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service for any reason, contact us within 30 days for a full refund.',
    },
    {
      question: 'How do I receive the picks?',
      answer: 'Picks are delivered via email and through our mobile app. You\'ll receive notifications as soon as new picks are available, typically 24-48 hours before game time.',
    },
    {
      question: 'Is this legal?',
      answer: 'Yes, providing sports betting analysis and predictions is completely legal. However, sports betting regulations vary by location, so please check your local laws before placing any bets.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Our current offering is a one-time payment for full season access. There are no recurring charges or subscriptions to cancel.',
    },
  ];

  return (
    <section className="py-20 bg-dark-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-6 text-left hover:bg-dark-800/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-dark-700/30 border-l-2 border-primary p-6 ml-4 rounded-r-lg">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}