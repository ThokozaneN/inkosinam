import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Storytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      gsap.from(textRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] overflow-hidden rounded-3xl">
            <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <img 
                src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2070&auto=format&fit=crop" 
                alt="Child smiling" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Side */}
          <div ref={textRef} className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Where Care Meets <span className="text-hope-blue">Community.</span>
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              <p>
                "For many children, INkosinami Community Center is the only place they find warmth, food, and hope."
              </p>
              <p>
                In the heart of our community, we see potential where others see poverty. We believe that every child deserves a chance to dream, to learn, and to grow in a safe environment.
              </p>
              <p>
                Our doors are always open, providing not just meals, but mentorship, love, and a pathway to a brighter future.
              </p>
            </div>
            
            <div className="pt-4">
              <div className="h-1 w-20 bg-warm-orange rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
