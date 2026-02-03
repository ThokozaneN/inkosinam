import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax and reveal
      gsap.fromTo(imageContainerRef.current,
        { 
          clipPath: 'inset(100% 0 0 0)',
          scale: 1.2
        },
        { 
          clipPath: 'inset(0% 0 0 0)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Image inner parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Quote reveal with character animation
      const quoteText = quoteRef.current?.querySelector('.quote-text');
      if (quoteText) {
        gsap.fromTo(quoteText,
          { 
            opacity: 0,
            y: 80,
            filter: 'blur(15px)'
          },
          { 
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );
      }

      // Founder card reveal
      gsap.fromTo(founderRef.current,
        { 
          opacity: 0,
          x: 100,
          rotateY: -20
        },
        { 
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: founderRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Values cards staggered reveal
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards) {
        gsap.fromTo(valueCards,
          { 
            opacity: 0,
            y: 60,
            scale: 0.9
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { icon: '❤️', title: 'Compassion', desc: 'Leading with love' },
    { icon: '🤝', title: 'Community', desc: 'Stronger together' },
    { icon: '✨', title: 'Hope', desc: 'Believing in tomorrow' },
    { icon: '🎯', title: 'Impact', desc: 'Making a difference' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="story" 
      className="relative py-32 md:py-48 bg-white overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div 
            ref={imageContainerRef}
            className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden"
          >
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
              alt="Children at INkosinam"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Floating stats */}
            <div className="absolute bottom-8 left-8 right-8 flex gap-4">
              <div className="flex-1 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl">
                <div className="text-3xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-600">Years Operating</div>
              </div>
              <div className="flex-1 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl">
                <div className="text-3xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600">Years Registered</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="relative">
            {/* Quote */}
            <div ref={quoteRef} className="mb-12">
              <div className="text-6xl text-blue-500 font-serif leading-none mb-4">"</div>
              <p className="quote-text text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-relaxed">
                Some children go to bed hungry. Others go to bed 
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> hopeful </span>
                — because of INkosinam.
              </p>
            </div>

            {/* Founder Card */}
            <div 
              ref={founderRef}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-xl mb-12"
            >
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-500">
                  E
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Esther Phindile Kubeka
                  </h3>
                  <p className="text-blue-600 font-medium">
                    Founder & Community Leader
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Esther founded INkosinam with a vision to restore dignity and opportunity to vulnerable children in the community. Her dedication has transformed countless lives over the past decade.
              </p>
              
              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>

            {/* Values Grid */}
            <div 
              ref={valuesRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="value-card group p-4 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 text-center hover:-translate-y-1"
                >
                  <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-500">
                    {value.icon}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {value.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {value.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/50 to-orange-100/50 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </section>
  );
}
