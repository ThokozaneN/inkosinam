import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      title: 'Community Gathering',
      category: 'Events',
      size: 'large',
    },
    {
      type: 'stat',
      value: '300+',
      label: 'Lives Changed',
      color: 'from-blue-500 to-indigo-600',
      size: 'normal',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80',
      title: 'Learning Together',
      category: 'Education',
      size: 'tall',
    },
    {
      type: 'quote',
      text: 'Every child deserves a chance to dream.',
      author: 'Esther Kubeka',
      size: 'normal',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      title: 'Meal Time',
      category: 'Nutrition',
      size: 'normal',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80',
      title: 'Creative Arts',
      category: 'Programs',
      size: 'wide',
    },
    {
      type: 'video',
      src: 'https://images.unsplash.com/photo-1529390079861-591f73437822?w=800&q=80',
      title: 'Our Story',
      duration: '2:45',
      size: 'normal',
    },
    {
      type: 'stat',
      value: '10+',
      label: 'Years of Impact',
      color: 'from-orange-500 to-red-500',
      size: 'normal',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      title: 'Homework Help',
      category: 'Education',
      size: 'normal',
    },
    {
      type: 'cta',
      title: 'Join Our Mission',
      size: 'normal',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80',
      title: 'Sports Day',
      category: 'Activities',
      size: 'tall',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80',
      title: 'Celebration',
      category: 'Events',
      size: 'normal',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Gallery items with staggered 3D reveal
      const items = gridRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        items.forEach((item, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          
          gsap.fromTo(item,
            { 
              opacity: 0, 
              y: 100,
              z: -200,
              rotateX: 15,
              rotateY: (col - 1.5) * 5,
              scale: 0.8
            },
            { 
              opacity: 1, 
              y: 0,
              z: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 50%',
                scrub: 1,
              }
            }
          );

          // Subtle float on scroll
          gsap.to(item, {
            yPercent: -5 - (row * 2),
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 3,
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'tall':
        return 'md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      default:
        return '';
    }
  };

  const renderItem = (item: typeof galleryItems[0], index: number) => {
    const baseClasses = `gallery-item group relative rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${getSizeClasses(item.size)}`;

    switch (item.type) {
      case 'image':
        return (
          <div
            key={index}
            className={`${baseClasses} cursor-pointer min-h-[280px]`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-2">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        );

      case 'stat':
        return (
          <div
            key={index}
            className={`${baseClasses} bg-gradient-to-br ${item.color} p-8 flex flex-col justify-center items-center text-center min-h-[280px]`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl" />
            </div>
            <span className="text-6xl md:text-7xl font-bold text-white mb-2 relative z-10 group-hover:scale-110 transition-transform duration-500">
              {item.value}
            </span>
            <span className="text-white/80 font-medium relative z-10">
              {item.label}
            </span>
          </div>
        );

      case 'quote':
        return (
          <div
            key={index}
            className={`${baseClasses} bg-gray-900 p-8 flex flex-col justify-center min-h-[280px]`}
          >
            <div className="text-5xl text-blue-500 font-serif mb-4 group-hover:scale-110 transition-transform duration-500 origin-left">"</div>
            <p className="text-xl text-white font-medium leading-relaxed mb-4">
              {item.text}
            </p>
            <p className="text-gray-400 text-sm">— {item.author}</p>
          </div>
        );

      case 'video':
        return (
          <div
            key={index}
            className={`${baseClasses} cursor-pointer min-h-[280px]`}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                {item.duration}
              </span>
              <span className="text-white font-medium">{item.title}</span>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div
            key={index}
            className={`${baseClasses} bg-gradient-to-br from-orange-500 to-red-600 p-8 flex flex-col justify-center items-center text-center cursor-pointer min-h-[280px]`}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
            <div className="flex items-center gap-2 text-white/80 group-hover:gap-4 transition-all duration-500">
              <span>Get Involved</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className="relative py-32 md:py-48 bg-gray-50 overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
            Our Gallery
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Moments that
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> matter</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every image tells a story of hope, resilience, and community
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {galleryItems.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && galleryItems[selectedImage].type === 'image' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-5xl max-h-[80vh] rounded-2xl overflow-hidden">
            <img
              src={galleryItems[selectedImage].src}
              alt={galleryItems[selectedImage].title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-2">
                {galleryItems[selectedImage].category}
              </span>
              <h3 className="text-2xl font-bold text-white">{galleryItems[selectedImage].title}</h3>
            </div>
          </div>

          {/* Navigation */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              const imageIndices = galleryItems.map((item, i) => item.type === 'image' ? i : -1).filter(i => i !== -1);
              const currentIdx = imageIndices.indexOf(selectedImage);
              const prevIdx = currentIdx > 0 ? imageIndices[currentIdx - 1] : imageIndices[imageIndices.length - 1];
              setSelectedImage(prevIdx);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              const imageIndices = galleryItems.map((item, i) => item.type === 'image' ? i : -1).filter(i => i !== -1);
              const currentIdx = imageIndices.indexOf(selectedImage);
              const nextIdx = currentIdx < imageIndices.length - 1 ? imageIndices[currentIdx + 1] : imageIndices[0];
              setSelectedImage(nextIdx);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
