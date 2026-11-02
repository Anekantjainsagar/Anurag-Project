"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "New Delhi",
    rating: 5,
    text: "The Toor Dal quality is exceptional — no polish, no wax, just pure desi dal like my grandmother used to buy. My family can taste the difference!",
    product: "Organic Toor Dal",
  },
  {
    name: "Rajesh Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Finally found authentic cold-pressed mustard oil and A2 Bilona Ghee. The aroma itself tells you this is the real thing. Superb quality!",
    product: "A2 Bilona Ghee",
  },
  {
    name: "Sneha Iyer",
    location: "Bangalore",
    rating: 5,
    text: "I ordered millets and honey — both arrived fresh and well-packed. The wild forest honey crystallizes naturally, which proves it is pure.",
    product: "Wild Forest Honey",
  },
  {
    name: "Arun Verma",
    location: "Lucknow",
    rating: 5,
    text: "Running a small restaurant, I switched to ONAAR spices and the feedback from customers has been incredible. Authentic taste in every dish.",
    product: "Garam Masala Powder",
  },
  {
    name: "Meera Krishnan",
    location: "Chennai",
    rating: 5,
    text: "The Kashmiri almonds and walnuts are premium quality. My children love snacking on these instead of processed junk food. Thank you!",
    product: "Kashmiri Almonds",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    text: "Bulk ordered rice and wheat for the whole family. Sharbati atta chapatis are softer and more nutritious than any branded flour in market.",
    product: "Sharbati Wheat Atta",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 bg-[#faf9f5] w-full font-sans border-b border-[#f0ece1]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Customer Love</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Trusted by 10,000+ Indian Families
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Real reviews from real customers across India who made the switch to pure, unpolished organic food.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:border-[#01722C]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#01722C]/20" />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {t.location} • {t.product}
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
