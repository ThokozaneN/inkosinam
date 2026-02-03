import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Handshake, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-primary relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hope-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-warm-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="cta-item text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
          Be part of the change.
        </h2>
        <p className="cta-item text-xl text-gray-300 max-w-2xl mx-auto mb-16 leading-relaxed">
          Your support can transform a child's life today. Whether you donate, volunteer, or partner with us, you are making a difference.
        </p>

        <div className="cta-item flex flex-col md:flex-row justify-center items-center gap-6">
          <Link
            to="/donate"
            className="group flex items-center gap-3 px-8 py-4 bg-hope-blue text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 w-full md:w-auto justify-center"
          >
            <Heart className="fill-white group-hover:scale-110 transition-transform" />
            Donate Now
          </Link>
          
          <Link
            to="/contact"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full text-lg font-semibold hover:bg-gray-100 transition-all w-full md:w-auto justify-center"
          >
            <Handshake className="text-primary group-hover:scale-110 transition-transform" />
            Partner with Us
          </Link>

          <Link
            to="/volunteer"
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all w-full md:w-auto justify-center"
          >
            <Users className="group-hover:scale-110 transition-transform" />
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
