import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607962837359-92e989b79c29?q=80&w=2070&auto=format&fit=crop",
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Moments of Joy</h2>
          <p className="text-gray-500">Capturing the smiles and hope we build together.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`gallery-item relative overflow-hidden rounded-xl h-64 ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
