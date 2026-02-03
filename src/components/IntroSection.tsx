import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the text reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        }
      });

      // Staggered line reveals with blur effect
      [line1Ref, line2Ref, line3Ref].forEach((ref, index) => {
        tl.fromTo(ref.current,
          { 
            opacity: 0, 
            y: 60,
            filter: 'blur(10px)',
            rotateX: 15
          },
          { 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
            duration: 1,
            ease: 'power3.out'
          },
          index * 0.2
        );
      });

      // Stats reveal with scale
      gsap.fromTo(statsRef.current?.children || [],
        { 
          opacity: 0, 
          y: 40,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Parallax effect on the whole section
      gsap.to(textRef.current, {
        yPercent: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '10+', label: 'Years of Service', color: 'bg-blue-500' },
    { value: '1000+', label: 'Meals Served', color: 'bg-orange-500' },
    { value: '300+', label: 'Children Supported', color: 'bg-green-500' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="intro" 
      className="relative py-32 md:py-48 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-50 to-transparent opacity-50" />
      </div>

      <div ref={textRef} className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20" style={{ perspective: '1000px' }}>
          <span 
            ref={line1Ref}
            className="block text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
          >
            For many children,
          </span>
          <span 
            ref={line2Ref}
            className="block text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
          >
            INkosinam is the only place they find
          </span>
          <span 
            ref={line3Ref}
            className="block text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 bg-clip-text text-transparent">
              warmth, food, and hope.
            </span>
          </span>
        </div>

        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center pt-4">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
