import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, BookOpen, Sprout, Calendar, Heart, ArrowRight, CheckCircle, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/utils/cn';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: 'meals',
    name: 'Cooked Meals Program',
    icon: Utensils,
    tagline: 'No child should go to bed hungry.',
    description:
      'We prepare warm, nutritious meals so that children in Embalenhle do not have to learn on an empty stomach. For many, this is the most reliable meal of the day.',
    bullets: [
      'Freshly cooked meals served in a safe, caring environment.',
      'Priority given to orphaned and vulnerable children.',
      'Simple routines that teach gratitude, sharing, and responsibility.',
    ],
    metrics: ['Hundreds of plates served each month', '5 days a week during school terms'],
    image:
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1800&auto=format&fit=crop',
    imageCaption: 'Warm, home-style meals shared around a table of friends.',
    accent: 'warm',
  },
  {
    id: 'homework',
    name: 'Homework Assistance',
    icon: BookOpen,
    tagline: 'A quiet desk, a helping hand, a chance to catch up.',
    description:
      'Our homework space gives children a calm place to focus, ask questions, and get the support they often cannot access at home.',
    bullets: [
      'Structured after-school sessions led by caring volunteers.',
      'Support with reading, maths, and key school subjects.',
      'Close relationships with local schools to understand learner needs.',
    ],
    metrics: ['Dozens of learners supported weekly', 'Improved school attendance and confidence'],
    image:
      'https://images.unsplash.com/photo-1600758201742-6be9eb37a25e?q=80&w=1800&auto=format&fit=crop',
    imageCaption: 'Children receiving patient, one-on-one homework support.',
    accent: 'blue',
  },
  {
    id: 'life-skills',
    name: 'Life Skills & Mentorship',
    icon: Sprout,
    tagline: 'We are raising whole humans, not just report cards.',
    description:
      'Through life skills, small groups, and mentorship, we help children navigate emotions, choices, and dreams with courage.',
    bullets: [
      'Age-appropriate sessions on identity, choices, and resilience.',
      'Safe conversations about peer pressure, social media, and relationships.',
      'Mentors who listen, guide, and model healthy adulthood.',
    ],
    metrics: ['Regular small-group sessions', 'Growing circle of trusted mentors'],
    image:
      'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1800&auto=format&fit=crop',
    imageCaption: 'Life skills and mentorship that build confidence and hope.',
    accent: 'green',
  },
  {
    id: 'holiday',
    name: 'Holiday & Weekend Programs',
    icon: Calendar,
    tagline: 'When school closes, our doors stay open.',
    description:
      'School holidays can be long and unsafe for children with nowhere to go. Our holiday programs keep children engaged, fed, and protected.',
    bullets: [
      'Fun days filled with games, creative activities, and outings when possible.',
      'Special holiday meals and celebrations that children look forward to.',
      'Safe supervision when school is closed and parents are working.',
    ],
    metrics: ['Holiday programs every major school break', 'Dozens of children off the streets and in safe spaces'],
    image:
      'https://images.unsplash.com/photo-1607962837359-92e989b79c29?q=80&w=1800&auto=format&fit=crop',
    imageCaption: 'School breaks turned into safe, joy-filled memories.',
    accent: 'purple',
  },
] as const;

export function ProgramsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);

  const activeProgram = programs.find((p) => p.id === activeProgramId) ?? null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.program-block', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openSponsorModal = (programId: string) => {
    setActiveProgramId(programId);
    setIsModalOpen(true);
  };

  const closeSponsorModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={containerRef} className="bg-soft-cream pt-32 pb-24 min-h-screen relative">
      <div className="container mx-auto px-6 space-y-16">
        {/* Hero / intro */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] items-center">
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
              Programs at INkosinami
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              Practical care.{' '}
              <span className="text-hope-blue">Everyday impact.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Each program at INkosinami Community Center is designed around one simple idea:
              when a child is fed, supported, and seen, their entire future shifts. In
              Embalenhle, that future matters.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {programs.map((program) => (
                <a
                  key={program.id}
                  href={`#${program.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-hope-blue/40 hover:text-primary transition-colors"
                >
                  <program.icon className="h-3.5 w-3.5" />
                  {program.name}
                </a>
              ))}
            </div>
          </div>

          <div className="relative max-w-xl lg:ml-auto">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-3xl bg-hope-blue/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-3xl bg-warm-orange/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl bg-primary shadow-xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1800&auto=format&fit=crop"
                alt="Children at INkosinami community program"
                className="h-80 w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-sm text-white/85 space-y-1">
                <p className="text-xs font-medium tracking-[0.24em] uppercase text-white/70">
                  A day at INkosinami
                </p>
                <p>
                  From the first plate of food to the last homework check, every moment here is
                  designed to hold children with dignity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program sections */}
        <section className="space-y-10">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isReversed = index % 2 === 1;

            const accentClasses =
              program.accent === 'warm'
                ? 'bg-warm-orange/10 text-warm-orange'
                : program.accent === 'blue'
                ? 'bg-hope-blue/10 text-hope-blue'
                : program.accent === 'green'
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-purple-100 text-purple-600';

            return (
              <article
                key={program.id}
                id={program.id}
                className={cn(
                  'program-block group rounded-3xl bg-white/80 border border-gray-100 shadow-sm overflow-hidden',
                  'transition-shadow duration-300 hover:shadow-lg'
                )}
              >
                <div
                  className={cn(
                    'flex flex-col lg:flex-row',
                    isReversed && 'lg:flex-row-reverse'
                  )}
                >
                  {/* Text content */}
                  <div className="w-full lg:w-3/5 p-7 md:p-9 space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-1">
                      <Icon className="h-3.5 w-3.5" />
                      {program.name}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
                      {program.tagline}
                    </h2>

                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {program.description}
                    </p>

                    <ul className="mt-3 space-y-2 text-sm md:text-base text-gray-600">
                      {program.bullets.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-hope-blue" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {program.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="inline-flex items-center rounded-full bg-soft-cream px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openSponsorModal(program.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-hope-blue px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
                      >
                        <Heart className="h-4 w-4 fill-white" />
                        Sponsor this program
                      </button>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Partner with us
                      </Link>
                    </div>
                  </div>

                  {/* Image side */}
                  <div className="w-full lg:w-2/5 relative min-h-[220px] md:min-h-[260px] lg:min-h-full">
                    <div className="absolute inset-0">
                      <img
                        src={program.image}
                        alt={program.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </div>
                    <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-5">
                      <div className="flex justify-end">
                        <span
                          className={cn(
                            'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-medium border border-white/20 bg-black/20 text-white/90 backdrop-blur-md',
                            accentClasses
                          )}
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                            <Icon className="h-3 w-3" />
                          </span>
                          Program highlight
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-white/85 max-w-xs">
                        {program.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      {/* Sponsor / Donations Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start md:items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6"
          onClick={closeSponsorModal}
        >
          <div
            className="w-full max-w-lg md:max-w-3xl rounded-3xl bg-white/95 shadow-2xl border border-gray-100/80 backdrop-blur-sm overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-soft-cream/60">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500">
                  Sponsor a program
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-primary">
                  {activeProgram ? activeProgram.name : 'INkosinami Program Support'}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeSponsorModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                aria-label="Close donation form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid gap-5 md:grid-cols-[1.35fr,1.1fr] px-5 py-4 md:px-6 md:py-5 bg-soft-cream/40">
                {/* Simple donation form */}
                <form
                  className="space-y-4 text-sm rounded-2xl bg-white px-4 py-4 md:px-5 md:py-5 border border-gray-100 shadow-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Full name</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Email address</label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                      placeholder="+27..."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-medium text-gray-600">Amount (ZAR)</label>
                      <input
                        type="number"
                        min={10}
                        step={10}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                        placeholder="e.g. 250"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-medium text-gray-600">Program</label>
                      <input
                        type="text"
                        readOnly
                        value={activeProgram ? activeProgram.name : 'General support'}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Note (optional)</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60 resize-none"
                      placeholder="Share any message or instructions with the team."
                    />
                  </div>

                  <p className="text-[11px] text-gray-500">
                    This form is for coordination only. To complete your donation, please use the
                    bank details alongside and include your name as the reference.
                  </p>

                  <button
                    type="submit"
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-hope-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-white" />
                    I will sponsor via EFT
                  </button>
                </form>

                {/* Banking details */}
                <div className="space-y-4 rounded-2xl bg-primary text-white px-4 py-4 md:px-5 md:py-5 relative overflow-hidden">
                  <div className="absolute -top-8 -right-10 h-24 w-24 rounded-full bg-hope-blue/30 blur-2xl" />
                  <div className="absolute -bottom-10 -left-14 h-28 w-28 rounded-full bg-warm-orange/25 blur-2xl" />

                  <div className="relative space-y-3">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
                      Bank transfer details
                    </p>
                    <h4 className="text-sm font-semibold">INkosinami Community Center</h4>

                    <div className="space-y-1.5 text-[12px] md:text-xs text-white/85">
                      <div className="flex justify-between gap-4">
                        <span className="text-white/60">Bank</span>
                        <span className="font-medium">Your Bank Name</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/60">Account Name</span>
                        <span className="font-medium text-right">INkosinami Community Center</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/60">Account Number</span>
                        <span className="font-medium">123 456 789</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/60">Branch Code</span>
                        <span className="font-medium">123 456</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/60">Account Type</span>
                        <span className="font-medium">Cheque / Current</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/60">Reference</span>
                        <span className="font-medium text-right">
                          {activeProgram ? activeProgram.id.toUpperCase() : 'GENERAL'} + Your Name
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-black/20 border border-white/10 px-3 py-2.5 text-[11px] text-white/85">
                      <p className="font-medium mb-1">WhatsApp proof of payment</p>
                      <p>
                        Send your POP to <span className="font-semibold">+27 00 000 0000</span> so we can
                        allocate your gift to the right program and thank you personally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
