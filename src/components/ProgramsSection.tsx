import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { 
          opacity: 0, 
          y: 60,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
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

      // Cards horizontal reveal with rotation
      const cards = cardsRef.current?.querySelectorAll('.program-card');
      if (cards) {
        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          
          gsap.fromTo(card,
            { 
              opacity: 0, 
              x: direction * 100,
              rotateY: direction * 15,
              scale: 0.9
            },
            { 
              opacity: 1, 
              x: 0,
              rotateY: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1,
              }
            }
          );

          // Parallax on scroll for each card
          gsap.to(card, {
            yPercent: -5 * (index + 1),
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const programs = [
    {
      title: 'Cooked Meals Program',
      description: 'Providing nutritious daily meals to ensure no child goes hungry. Good nutrition is the foundation for learning and growth.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      stats: { value: '1000+', label: 'Meals Monthly' },
      color: 'from-orange-500 to-red-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Homework Assistance',
      description: 'After-school tutoring and academic support to help children succeed in their education and build confidence.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      stats: { value: '5', label: 'Days a Week' },
      color: 'from-blue-500 to-indigo-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Life Skills Programs',
      description: 'Teaching essential life skills including financial literacy, health education, and personal development.',
      image: 'https://images.unsplash.com/photo-1529390079861-591f73437822?w=800&q=80',
      stats: { value: '12', label: 'Programs' },
      color: 'from-green-500 to-emerald-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Holiday Programs',
      description: 'Special activities during school holidays to keep children engaged, learning, and having fun in a safe environment.',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80',
      stats: { value: '4', label: 'Per Year' },
      color: 'from-purple-500 to-pink-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="programs" 
      className="relative py-32 md:py-48 bg-gray-50 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive support designed to nurture every aspect of a child's development
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {programs.map((program, index) => (
            <div 
              key={index}
              className="program-card group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating icon */}
                <div className={`absolute top-6 right-6 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {program.icon}
                </div>

                {/* Stats badge */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <span className="text-white font-bold">{program.stats.value}</span>
                  <span className="text-white/80 ml-1 text-sm">{program.stats.label}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {program.description}
                </p>
                
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group/btn">
                  <span className="relative">
                    Learn More
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover/btn:w-full" />
                  </span>
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Hover border effect */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
