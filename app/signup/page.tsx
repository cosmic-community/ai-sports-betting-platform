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
    // Return default settings if fetch fails
    return {
      id: '',
      slug: 'site-settings',
      title: 'Site Settings',
      type_slug: 'site-settings',
      status: 'published',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        subscription_price: '$279',
        regular_price: '$399',
        hero_cta_text: 'Get AI Picks Now',
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