import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export function SEOHead({
  title = "ReshADX - Africa's Financial Data Infrastructure",
  description = "Verify identities, access financial data, and build compliant products across 10+ African countries with one powerful API. Trusted by 100+ African businesses.",
  keywords = "africa fintech, identity verification, KYC, financial data API, biometric verification, mobile money, ghana card, BVN, NIN, credit scoring, african payments",
  ogImage = "https://reshadx.com/og-image.png",
  ogType = "website",
  canonical = "https://reshadx.com",
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags: Record<string, string> = {
      description,
      keywords,
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'og:type': ogType,
      'og:url': canonical,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'theme-color': '#06B6D4',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement;
      }
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    });

    // Update canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Add JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ReshADX',
      alternateName: 'Africa Open Data Exchange',
      url: 'https://reshadx.com',
      logo: 'https://reshadx.com/logo.png',
      description:
        "Africa's leading financial data infrastructure platform for identity verification and financial data access",
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NG',
        addressRegion: 'Lagos',
      },
      sameAs: [
        'https://twitter.com/reshadx',
        'https://linkedin.com/company/reshadx',
        'https://github.com/reshadx',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@reshadx.com',
        contactType: 'Customer Service',
        availableLanguage: ['en', 'fr', 'sw', 'ar', 'ha'],
      },
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, ogImage, ogType, canonical]);

  return null;
}
