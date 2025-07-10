import { Metadata } from 'next';
import SignupForm from '@/components/SignupForm';
import { createBucketClient } from '@cosmicjs/sdk';
import { SiteSettings } from '@/types';

export const metadata: Metadata = {
  title: 'Sign Up - AI Sports Betting Platform',
  description: 'Get access to our AI-powered sports betting picks and start winning today.',
};

async function getSiteSettings(): Promise<SiteSettings> {
  const cosmic = createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
    readKey: process.env.COSMIC_READ_KEY || '',
  });

  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings',
      slug: 'site-settings',
    });
    return response.object;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    // Return default settings if fetch fails - only include properties defined in SiteSettings interface
    return {
      id: 'default-site-settings',
      slug: 'site-settings',
      title: 'Site Settings',
      type_slug: 'site-settings',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        subscription_price: '$279',
        regular_price: '$399',
        hero_cta_text: 'Get AI Picks Now',
        hero_headline: 'AI-Powered Sports Betting Picks',
        hero_subheadline: 'Join thousands of winning bettors',
        current_season_record: '78-42',
        season_roi: '24.3%',
        win_rate: '65%',
        floating_button_text: 'Get Picks Now',
        exit_intent_headline: 'Wait! Don\'t Miss Out',
        exit_intent_offer: 'Get 30% Off',
        blog_cta_default: 'Ready to start winning?',
      },
    };
  }
}

export default async function SignupPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Complete Your Order
            </h1>
            <p className="text-gray-400">
              Join thousands of winning bettors today
            </p>
          </div>

          <SignupForm siteSettings={siteSettings} />
        </div>
      </div>
    </div>
  );
}