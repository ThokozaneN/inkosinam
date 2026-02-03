import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

      // Contact cards stagger from bottom
      const cards = cardsRef.current?.querySelectorAll('.contact-card');
      if (cards) {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            }
          }
        );
      }

      // Form reveal
      gsap.fromTo(formRef.current,
        { 
          opacity: 0, 
          y: 60,
          rotateX: 10
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email Us',
      value: 'info@inkosinam.org',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Call Us',
      value: '+27 12 345 6789',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Visit Us',
      value: 'Gauteng, South Africa',
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-32 md:py-48 bg-gray-50 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Let's connect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? Want to volunteer or partner with us? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="contact-card group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {info.label}
              </h3>
              <p className="text-gray-600">
                {info.value}
              </p>
              
              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-8 md:p-12 rounded-3xl bg-white border border-gray-100 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
            <p className="text-gray-600">We'll get back to you within 24 hours</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 resize-none"
                placeholder="How can we help you?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
