import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Founder() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.founder-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-soft-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-12">
          
          <div className="founder-content w-full md:w-1/3 shrink-0">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
               <img 
                src="https://images.unsplash.com/photo-1507537297725-24a1c434c67b?q=80&w=1974&auto=format&fit=crop" 
                alt="Esther Phindile Kubeka" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="founder-content w-full md:w-2/3 space-y-6">
            <Quote className="text-warm-orange w-12 h-12 mb-4" />
            
            <blockquote className="text-2xl md:text-3xl font-medium text-primary leading-relaxed">
              "We founded INkosinami Community Center with a vision to restore dignity and opportunity to vulnerable children in our community. It's not just about feeding bodies, but feeding futures."
            </blockquote>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900">Esther Phindile Kubeka</h4>
              <p className="text-hope-blue font-medium">Founder & Community Leader</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
