import React from 'react';
import { Star, Quote } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const testimonials = [
  {
    name: 'Amara Okafor',
    role: 'CEO, QuickLoan Nigeria',
    company: 'QuickLoan',
    image: 'https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    quote: 'ReshADX reduced our KYC time from 3 days to 3 minutes. The API integration was seamless, and our customers love the instant verification. This is a game-changer for African fintech.',
    rating: 5,
    country: '🇳🇬 Nigeria',
    metric: '95% faster KYC',
  },
  {
    name: 'Kwame Mensah',
    role: 'CTO, PayGhana',
    company: 'PayGhana',
    image: 'https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    quote: 'The biometric verification and Ghana Card integration are top-notch. We\'ve seen a 40% reduction in fraud and our approval rates increased by 60%. Highly recommended!',
    rating: 5,
    country: '🇬🇭 Ghana',
    metric: '60% higher approvals',
  },
  {
    name: 'Fatima Hassan',
    role: 'Head of Product, Safaricom Financial',
    company: 'Safaricom',
    image: 'https://images.unsplash.com/photo-1758874385393-3ef15b394a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    quote: 'ReshADX\'s M-Pesa integration is flawless. Real-time transaction verification and income analysis have helped us serve our customers better. The best API we\'ve worked with.',
    rating: 5,
    country: '🇰🇪 Kenya',
    metric: '2M+ verifications',
  },
  {
    name: 'Chioma Adeyemi',
    role: 'Founder, LendAfrica',
    company: 'LendAfrica',
    image: 'https://images.unsplash.com/photo-1689857538296-b6e1a392a91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    quote: 'We expanded to 5 countries in 6 months thanks to ReshADX. One API, multiple countries, no hassle. The documentation is excellent and support is outstanding. 10/10!',
    rating: 5,
    country: '🌍 Pan-African',
    metric: '5 countries',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1E293B] to-[#0A2540]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#F39C12]/20 border border-[#D4AF37]/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-white">Loved by 100+ Companies</span>
            </div>
            <h2 className="text-white text-4xl lg:text-5xl mb-4">
              What Our Customers Say
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Join hundreds of companies building the future of African fintech
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all h-full flex flex-col">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/90 text-lg leading-relaxed mb-6 flex-1">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metric Badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1.5 bg-[#10B981]/20 border border-[#10B981]/30 rounded-full">
                    <span className="text-[#10B981] text-sm">✓ {testimonial.metric}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <div className="text-white mb-1">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                    <div className="text-[#06B6D4] text-sm">{testimonial.country}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust Stats */}
        <AnimatedSection animation="fade-up" delay={400}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '4.9/5', label: 'Average Rating' },
              { value: '100+', label: 'Happy Customers' },
              { value: '99.9%', label: 'Uptime' },
              { value: '< 1hr', label: 'Support Response' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl text-[#06B6D4] mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
