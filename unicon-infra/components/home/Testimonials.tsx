"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiStar } from "react-icons/hi";
import { BsQuote } from "react-icons/bs";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Testimonial } from "@/lib/types";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-28 md:py-36 bg-black relative">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Testimonials"
          title="Words From Our Residents & Investors"
        />

        <div className="mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="testimonial-swiper pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <GlassCard className="h-full flex flex-col" hover={false}>
                  <BsQuote className="text-luxury-gold/40" size={32} />
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mt-4 flex-1">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{t.name}</p>
                      <p className="text-white/40 text-xs">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <HiStar key={i} className="text-luxury-gold" size={14} />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: rgba(200, 169, 106, 0.3);
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #c8a96a;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
