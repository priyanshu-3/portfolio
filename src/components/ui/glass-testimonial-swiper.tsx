import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

// --- Component Interfaces ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
}

// --- The Component ---
export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    cardRefs.current[activeIndex]?.classList.add('is-dragging');
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    cardRefs.current[activeIndex]?.classList.remove('is-dragging');
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  if (!testimonials?.length) return null;

  return (
    <section className="relative w-full max-w-3xl mx-auto h-[450px] md:h-[350px] pb-10 perspective-1000">
      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex;
        // Calculate the card's position in the display order
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        // --- DYNAMIC STYLE CALCULATION ---
        const style: CSSProperties = {};
        if (displayOrder === 0) { // The active card
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) { // Cards stacked behind
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -2 * displayOrder; // in rem
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.2 * displayOrder;
          style.zIndex = totalCards - displayOrder;
        } else { // Cards that are out of view
          style.transform = 'scale(0)';
          style.opacity = 0;
          style.zIndex = 0;
        }

        const tagClasses = (type: 'featured' | 'default') => type === 'featured' 
          ? 'bg-primary/20 text-primary border border-primary/30' 
          : 'bg-secondary text-secondary-foreground';
          
        return (
          <div
            ref={el => cardRefs.current[index] = el}
            key={testimonial.id}
            className={`absolute top-0 left-0 w-full rounded-3xl border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.8)] cursor-grab origin-bottom ${isDragging && isActive ? 'transition-none cursor-grabbing' : 'transition-all duration-500 ease-out'}`}
            style={style} // Apply dynamic styles here
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold text-base" style={{ background: testimonial.avatarGradient }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-white/60 mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-white/90 leading-relaxed text-lg mb-6">"{testimonial.quote}"</blockquote>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 pt-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} className={['text-xs', 'px-2', 'py-1', 'rounded-md', tagClasses(tag.type)].join(' ')}>
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  {testimonial.stats.map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <span key={i} className="flex items-center">
                        <IconComponent className="mr-1.5 h-3.5 w-3.5" />
                        {stat.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="flex gap-2 justify-center absolute -bottom-4 left-0 right-0 z-50">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            aria-label={`Go to testimonial ${index + 1}`} 
            onClick={() => navigate(index)} 
            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-6 bg-primary' : 'w-2 bg-white/20'}`} 
          />
        ))}
      </div>
    </section>
  );
};

import { Users, Calendar, ThumbsUp, ShieldCheck, Clock, Share, Rocket, Zap, Gem } from 'lucide-react';  

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    initials: 'SM',
    name: 'Sarah Mitchell',
    role: 'VP of Engineering at TechFlow',
    quote: "This platform has completely transformed how our team collaborates. The AI-powered analytics provide insights we never had before, and the performance improvements are remarkable. Best investment we've made this year.",
    tags: [{ text: 'FEATURED', type: 'featured' }, { text: 'Enterprise', type: 'default' }],
    stats: [{ icon: Users, text: '200+ team' }, { icon: Calendar, text: '2 years customer' }],
    avatarGradient: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
  },
  {
    id: 2,
    initials: 'MC',
    name: 'Marcus Chen',
    role: 'Product Manager at DataSync',
    quote: "The real-time collaboration features are game-changing. Our remote team feels more connected than ever, and the platform's reliability is outstanding. The mobile experience is seamless across all devices.",
    tags: [{ text: 'Startup', type: 'default' }, { text: 'Mobile', type: 'default' }],
    stats: [{ icon: ThumbsUp, text: 'Helpful' }, { icon: ShieldCheck, text: 'Verified' }],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    initials: 'AR',
    name: 'Alex Rodriguez',
    role: 'CTO at StartupFlow',
    quote: "Incredible performance boost and the mobile apps are flawless. Support team is responsive and the feature roadmap aligns perfectly with our needs. The customization options are endless.",
    tags: [{ text: 'Enterprise', type: 'default' }, { text: 'API User', type: 'default' }],
    stats: [{ icon: Clock, text: '6 months ago' }, { icon: Share, text: 'Shared 8 times' }],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    initials: 'EJ',
    name: 'Emily Johnson',
    role: 'Founder of Innovate Inc.',
    quote: "As a new company, speed is everything. This tool allowed us to scale our operations twice as fast without doubling our headcount. A must-have for any ambitious startup.",
    tags: [{ text: 'New', type: 'default' }, { text: 'Growth', type: 'featured' }],
    stats: [{ icon: Rocket, text: 'Scaled 2x' }, { icon: Zap, text: 'Fast Setup' }],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
  },
  {
    id: 5,
    initials: 'DW',
    name: 'David Wong',
    role: 'Lead Designer at Creative Co.',
    quote: "The user interface is not just beautiful, it's intuitive. Our design team was able to adopt it instantly, streamlining our entire workflow and improving creative output.",
    tags: [{ text: 'Design', type: 'default' }],
    stats: [{ icon: Gem, text: 'Top UI/UX' }],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  }
];

export const TestimonialStackDemo = () => {
  return (
    <div className="w-full flex items-center justify-center p-4">
        <TestimonialStack testimonials={testimonialsData} />
    </div>
  );
};
