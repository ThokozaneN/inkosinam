import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, BookOpen, Sprout, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Utensils,
    title: 'Cooked Meals Program',
    description: 'Providing nutritious meals to ensure no child goes to bed hungry.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: BookOpen,
    title: 'Homework Assistance',
    description: 'Academic support to help children excel in their schoolwork.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Sprout,
    title: 'Life Skills Programs',
    description: 'Empowering workshops to build confidence and resilience.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Calendar,
    title: 'Holiday Programs',
    description: 'Safe and engaging activities during school holidays.',
    color: 'bg-purple-100 text-purple-600',
  },
];

export function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.program-card', { autoAlpha: 0, y: 50 });
      
      ScrollTrigger.batch('.program-card', {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            overwrite: true
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-soft-cream">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Our Programs</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We provide comprehensive support to ensure every child has the opportunity to thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <Link 
              key={index}
              to="/programs"
              className="program-card group bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 block h-full"
            >
              <div className={`w-14 h-14 rounded-xl ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <program.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                {program.description}
              </p>
              <div className="flex items-center text-sm font-semibold text-primary group-hover:text-hope-blue transition-colors">
                Learn More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
