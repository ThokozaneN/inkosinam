import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        yPercent: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Heading reveal with split animation
      gsap.fromTo(headingRef.current,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Stats cards staggered reveal
      const statCards = statsGridRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(statCards,
          { 
            opacity: 0, 
            y: 100,
            rotateY: -15,
            scale: 0.8
          },
          { 
            opacity: 1, 
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );
      }

      // Animate counter numbers
      const counters = statsGridRef.current?.querySelectorAll('.counter-value');
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-value') || '0');
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              const value = Math.round(gsap.getProperty(counter, 'innerText') as number);
              counter.textContent = value.toLocaleString();
            }
          }
        );
      });

      // Badge floating animation
      gsap.to(badgeRef.current, {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { 
      value: 10, 
      suffix: '+',
      label: 'Years of Service',
      description: 'A decade of unwavering commitment',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-blue-400 to-blue-600'
    },
    { 
      value: 1000, 
      suffix: '+',
      label: 'Meals Served',
      description: 'Nourishing bodies and souls',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-orange-400 to-red-500'
    },
    { 
      value: 300, 
      suffix: '+',
      label: 'Children Supported',
      description: 'Young lives transformed',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-green-400 to-emerald-600'
    },
    { 
      value: 8, 
      suffix: ' Years',
      label: 'Registered NPO',
      description: 'Official recognition and trust',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'from-purple-400 to-indigo-600'
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="impact" 
      className="relative py-32 md:py-48 bg-gray-950 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-6">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Numbers that
            <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-blue-400 bg-clip-text text-transparent">
              tell our story
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Every number represents a life touched, a meal served, and hope restored in our community.
          </p>
        </div>

        <div 
          ref={statsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                {stat.icon}
              </div>

              {/* Number */}
              <div className="flex items-baseline gap-1 mb-2">
                <span 
                  className="counter-value text-5xl font-bold text-white"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="text-2xl font-bold text-gray-400">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-500 text-sm">
                {stat.description}
              </p>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div 
          ref={badgeRef}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold">Verified & Trusted</div>
              <div className="text-gray-400 text-sm">Registered NPO with proven community impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
