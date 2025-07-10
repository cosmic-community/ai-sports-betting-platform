import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/lib/cosmic';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  return {
    title: siteSettings?.metadata?.hero_headline || 'AI Sports Betting Platform',
    description: siteSettings?.metadata?.hero_subheadline || 'Advanced AI-powered sports betting predictions and analysis',
    keywords: 'sports betting, AI predictions, betting picks, football betting, sports analysis',
    authors: [{ name: 'AI Sports Betting Platform' }],
    creator: 'AI Sports Betting Platform',
    publisher: 'AI Sports Betting Platform',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://your-domain.com',
      siteName: 'AI Sports Betting Platform',
      title: siteSettings?.metadata?.hero_headline || 'AI Sports Betting Platform',
      description: siteSettings?.metadata?.hero_subheadline || 'Advanced AI-powered sports betting predictions and analysis',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteSettings?.metadata?.hero_headline || 'AI Sports Betting Platform',
      description: siteSettings?.metadata?.hero_subheadline || 'Advanced AI-powered sports betting predictions and analysis',
      creator: '@yourtwitterhandle',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}