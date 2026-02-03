import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Image reveal
      tl.fromTo(imageRef.current,
        { scale: 1.3, filter: 'blur(20px)' },
        { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
      );

      // Overlay fade
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        0
      );

      // Tagline
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        0.8
      );

      // Heading - split into words
      const headingText = headingRef.current;
      if (headingText) {
        const words = headingText.innerText.split(' ');
        headingText.innerHTML = words.map(word => 
          `<span class="inline-block overflow-hidden"><span class="inline-block hero-word">${word}</span></span>`
        ).join(' ');
        
        tl.fromTo('.hero-word',
          { y: '100%', rotateX: -45 },
          { 
            y: '0%', 
            rotateX: 0,
            duration: 1.2, 
            ease: 'power4.out',
            stagger: 0.08
          },
          1
        );
      }

      // Description
      tl.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        1.5
      );

      // Buttons
      tl.fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.15 },
        1.8
      );

      // Scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1 },
        2.2
      );

      // Scroll-triggered parallax
      gsap.to(imageRef.current, {
        yPercent: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Content fade and parallax on scroll
      gsap.to(contentRef.current, {
        yPercent: -20,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        }
      });

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="images/pic3.jpeg"
          alt="Children in community"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
      />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <span 
          ref={taglineRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Registered NPO • 10+ Years of Impact
        </span>

        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 max-w-5xl leading-[1.1] tracking-tight"
          style={{ perspective: '1000px' }}
        >
          Restoring Hope, One Child at a Time
        </h1>

        <p 
          ref={descRef}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed"
        >
          INkosinam empowers orphaned and vulnerable children through 
          <span className="text-orange-400"> care</span>, 
          <span className="text-blue-400"> education</span>, and 
          <span className="text-green-400"> life skills</span>
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onNavigate('donate')}
            className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Donate Now
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Donate Now
            </span>
          </button>
          
          <button
            onClick={() => onNavigate('programs')}
            className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Explore Our Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => onNavigate('intro')}
      >
        <span className="text-white/60 text-sm font-medium tracking-widest uppercase group-hover:text-white transition-colors">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2 group-hover:border-white/60 transition-colors">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce group-hover:bg-white transition-colors" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
