'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "VytalWatch has transformed how we manage our CHF patients. We've reduced hospital readmissions by 35% in just 6 months.",
    author: "Dr. Sarah Mitchell",
    role: "Cardiologist",
    organization: "Heart Care Associates",
    rating: 5,
    image: null,
  },
  {
    id: 2,
    quote: "The AI alerts have been a game-changer. We caught a patient's deteriorating condition 48 hours before it became critical.",
    author: "Dr. Michael Chen",
    role: "Internal Medicine",
    organization: "Riverside Medical Group",
    rating: 5,
    image: null,
  },
  {
    id: 3,
    quote: "Finally, a platform that understands healthcare workflows. The billing integration alone saves us 10+ hours per week.",
    author: "Jennifer Adams",
    role: "Practice Manager",
    organization: "Family Health Clinic",
    rating: 5,
    image: null,
  },
  {
    id: 4,
    quote: "My patients love how easy it is to use the devices. Compliance rates have gone from 60% to over 90%.",
    author: "Dr. Robert Williams",
    role: "Primary Care Physician",
    organization: "Community Health Partners",
    rating: 5,
    image: null,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Trusted by Healthcare Leaders
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            See what our customers are saying about VytalWatch
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <div className="flex justify-center mb-4">
                      <Quote className="h-10 w-10 text-primary/20" />
                    </div>
                    
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-xl text-gray-700 dark:text-gray-300 text-center italic mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-3">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-primary">
                        {testimonial.organization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">35%</p>
            <p className="text-gray-600 dark:text-gray-400">Reduction in Readmissions</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">90%+</p>
            <p className="text-gray-600 dark:text-gray-400">Patient Compliance</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">10hrs</p>
            <p className="text-gray-600 dark:text-gray-400">Saved Weekly on Billing</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">48hrs</p>
            <p className="text-gray-600 dark:text-gray-400">Earlier Intervention</p>
          </div>
        </div>
      </div>
    </section>
  );
}
