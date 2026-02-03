import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-linked parallax + subtle zoom for background image
      gsap.to(imageRef.current, {
        yPercent: 30,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Minimal fade-up animation
      gsap.fromTo('.hero-content', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image - Clean & Darkened */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img 
          src='images/pic3.jpeg' 
          alt="Children playing" 
          className="w-full h-full object-cover"
        />
        {/* Simplified Overlay */}
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Minimal Content */}
      <div className="container relative z-10 px-6">
        <div ref={textRef} className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Main Headline */}
          <h1 className="hero-content text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Restoring hope,<br />
            <span className="text-white/90 font-medium">one child at a time.</span>
          </h1>
          
          {/* Subtext */}
          <p className="hero-content text-lg md:text-xl text-white/80 font-light max-w-xl mx-auto leading-relaxed">
            Empowering orphaned and vulnerable children through care, education, and life skills.
          </p>

          {/* Minimal Actions */}
          <div className="hero-content flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="/donate" 
              className="group flex items-center gap-2 px-8 py-3.5 bg-white text-primary rounded-full text-base font-medium hover:bg-gray-100 transition-all shadow-xl"
            >
              Donate Now
              <Heart className="w-4 h-4 fill-primary group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="/volunteer" 
              className="group flex items-center gap-2 px-8 py-3.5 bg-transparent border border-white/30 text-white rounded-full text-base font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Join Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll hint removed for a cleaner hero */}
    </div>
  );
}
