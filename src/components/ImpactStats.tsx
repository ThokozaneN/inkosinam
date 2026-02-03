import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: '+', label: 'Years of Service' },
  { value: 1000, suffix: '+', label: 'Meals Served' },
  { value: 300, suffix: '+', label: 'Children Supported' },
  { value: 8, suffix: ' Years', label: 'Registered NPO' },
];

export function ImpactStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade & slide in each tile
      gsap.from('.stat-item', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Counter animation
      stats.forEach((stat, index) => {
        const counter = document.getElementById(`counter-${index}`);
        if (counter) {
          gsap.to(counter, {
            innerText: stat.value,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500 mb-2">
              Impact in Numbers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              A decade of consistent care.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-gray-500">
            Every number represents a real child, a real meal, and a real story of hope in our community.
          </p>
        </div>

        {/* Bento-style grid: clear asymmetric layout on desktop */}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4 auto-rows-[minmax(150px,1fr)]">
          {stats.map((stat, index) => {
            const baseClasses =
              'stat-item relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm p-6 md:p-7 flex flex-col justify-between';

            // Bento layout on md+:
            // [0] big hero tile on the left (2 cols, 2 rows)
            // [1] small tile top-right
            // [2] small tile bottom-right
            // [3] wide tile spanning full width at the bottom
            const layoutClasses =
              index === 0
                ? 'md:col-span-2 md:row-span-2 bg-primary text-white border-primary/40'
                : index === 1
                ? 'md:col-span-2 bg-soft-cream text-gray-900'
                : index === 2
                ? 'md:col-span-2 bg-soft-cream text-gray-900'
                : 'md:col-span-4 bg-soft-cream text-gray-900';

            const accentClasses =
              index === 0
                ? 'bg-hope-blue/25'
                : index === 1
                ? 'bg-hope-blue/10'
                : index === 2
                ? 'bg-warm-orange/10'
                : 'bg-primary/5';

            return (
              <div key={index} className={`${baseClasses} ${layoutClasses}`}>
                {/* Accent glow */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl ${accentClasses}`}
                />

                <div className="relative z-10 flex flex-col gap-3 h-full">
                  <p
                    className={`text-xs font-medium tracking-[0.2em] uppercase md:text-[0.7rem] ${
                      index === 0 ? 'text-white/70' : 'text-gray-500/80'
                    }`}
                  >
                    {stat.label}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span
                      id={`counter-${index}`}
                      className={`text-4xl md:text-5xl font-semibold tracking-tight ${
                        index === 0 ? 'text-white' : 'text-primary'
                      }`}
                    >
                      0
                    </span>
                    <span
                      className={`text-2xl md:text-3xl font-semibold ${
                        index === 0 ? 'text-blue-300' : 'text-hope-blue'
                      }`}
                    >
                      {stat.suffix}
                    </span>
                  </div>

                  {index === 0 && (
                    <p className="mt-3 text-sm md:text-base text-white/80 max-w-sm">
                      Over a decade of serving orphaned and vulnerable children with consistency and care.
                    </p>
                  )}

                  {index === 1 && (
                    <p className="mt-2 text-xs md:text-sm text-gray-500 max-w-xs">
                      Daily cooked meals that keep children nourished, focused, and ready to learn.
                    </p>
                  )}

                  {index === 2 && (
                    <p className="mt-2 text-xs md:text-sm text-gray-500 max-w-xs">
                      Children who have received support, guidance, and a safe place to belong.
                    </p>
                  )}

                  {index === 3 && (
                    <p className="mt-2 text-xs md:text-sm text-gray-500 max-w-md">
                      Officially registered and accountable, trusted by our community and partners.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
