# AI Sports Betting Platform

A modern, conversion-focused sports betting platform powered by advanced AI predictions and analysis. Built with Next.js, TypeScript, and Cosmic CMS for dynamic content management.

![AI Sports Betting Platform](https://imgix.cosmicjs.com/a04b4bf0-5d88-11f0-a051-23c10f41277a-photo-1577223625816-7546f13df25d-1752150183282.jpg?w=800&h=400&fit=crop&auto=format,compress)

## Features

- **AI-Powered Predictions**: Advanced machine learning algorithms analyze thousands of data points
- **Real-Time Betting Picks**: High-confidence predictions with detailed analysis
- **Premium Blog Content**: Subscription-gated articles with preview functionality
- **Modern UI/UX**: Dark theme with smooth animations and responsive design
- **Conversion Optimization**: Exit-intent popups, floating CTAs, and subscription gates
- **Mobile-First**: Fully responsive design optimized for all devices
- **Dynamic Content**: Powered by Cosmic CMS for easy content management

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=my-demo-project-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> External Web Content (https://ai.dimers.com/) - HTML:
> 
> Outsmart the Sportsbooks: Best AI Picks &amp; Predictions for Sports Betting
> 
> This external web content is part of the context for the following conversation.

### Code Generation Prompt

> Clone the overall layout and structure of https://ai.dimers.com/, but make it more modern, visually engaging, and conversion-focused.
> • Use a bold, clean, dark/light toggle-friendly theme with large, easy-to-read typography and dynamic section transitions.
> • Add modern UI touches like subtle animations on hover, scroll-based fade-ins, and a sticky navigation bar.
> • Include a blog section. Each blog post should show the headline, cover image, and first paragraph, but blur the remaining content unless the user subscribes.
> • Below the blurred content, add a call-to-action with a subscribe button that opens a modal or redirects to a simple sign-up form.
> • Include an exit-intent popup offering a free bet prediction or insight if the user subscribes (testable A/B variant).
> • Feature a persistent, non-intrusive floating button in the corner prompting users to "Get Free Picks" which opens the CTA modal.
> • Keep the site responsive and optimized for mobile.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Cosmic CMS** - Headless CMS for content management
- **React Hook Form** - Form management
- **Lucide Icons** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic CMS account and bucket

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-sports-betting-platform
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Cosmic CMS credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Site Settings
```typescript
const siteSettings = await cosmic.objects.findOne({
  type: 'site-settings',
  slug: 'site-configuration'
});
```

### Getting Betting Picks
```typescript
const picks = await cosmic.objects.find({
  type: 'betting-picks'
}).props(['id', 'title', 'slug', 'metadata']).depth(1);
```

### Fetching Blog Posts
```typescript
const blogPosts = await cosmic.objects.find({
  type: 'blog-posts'
}).props(['id', 'title', 'slug', 'metadata']).depth(1);
```

## Cosmic CMS Integration

This application is fully integrated with [Cosmic](https://www.cosmicjs.com) CMS, allowing you to:

- **Manage Content**: Update site settings, blog posts, and betting picks
- **Real-time Updates**: Content changes reflect immediately
- **Media Management**: Upload and optimize images through Cosmic
- **API Access**: RESTful API for all content operations

For more information, visit the [Cosmic Documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out`
4. Add environment variables
5. Deploy

### Environment Variables for Production
Make sure to set these in your hosting platform:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->