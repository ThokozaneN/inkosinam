import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Utensils, BookOpen, Sprout, MapPin, Quote, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const summaryStats = [
  {
    id: 'children',
    label: 'Children supported each year',
    value: 300,
    suffix: '+',
    description: 'Children in Embalenhle who find a safe place to eat, learn, and be seen.',
  },
  {
    id: 'meals',
    label: 'Meals served',
    value: 1000,
    suffix: '+',
    description: 'Plates of cooked food shared with children who might otherwise go hungry.',
  },
  {
    id: 'years',
    label: 'Years present in the community',
    value: 10,
    suffix: '+',
    description: 'A decade of showing up consistently for children and families in Embalenhle.',
  },
  {
    id: 'sessions',
    label: 'Sessions each year',
    value: 200,
    suffix: '+',
    description: 'Homework, life skills, and holiday sessions that keep children safe and engaged.',
  },
] as const;

const storyCards = [
  {
    name: 'Thandi* (12)',
    role: 'Homework club learner',
    quote:
      'Before INkosinami, I used to hide my report. Now I have someone to help me and I am proud to show my marks.',
  },
  {
    name: 'Gogo M.*',
    role: 'Grandmother & caregiver',
    quote:
      'The children know there will be food and people who care. As a grandmother, I am not alone in raising them.',
  },
  {
    name: 'Local teacher',
    role: 'Partner school',
    quote:
      'We can see the difference in class. Children from INkosinami are more confident, more present, and more hopeful.',
  },
  {
    name: 'Community volunteer',
    role: 'Life skills mentor',
    quote:
      'We do not just keep them busy. We listen, we guide, and we remind them that their dreams still matter.',
  },
] as const;

const flowSteps = [
  {
    title: 'You give',
    description:
      'An individual, family, or company chooses to invest in children in Embalenhle — once-off or monthly.',
    icon: Heart,
  },
  {
    title: 'We turn gifts into daily care',
    description:
      'Donations are translated into meals, homework materials, life skills programs, and safe spaces.',
    icon: Utensils,
  },
  {
    title: 'Children experience real change',
    description:
      'Full stomachs. Finished homework. New skills. A sense of belonging and a future that feels possible.',
    icon: Sprout,
  },
] as const;

export function Impact() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap.from('.impact-hero', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Stats grid
      gsap.from('.impact-stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.impact-stat-grid',
          start: 'top 80%',
        },
      });

      // Story cards
      gsap.from('.impact-story-card', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.impact-stories',
          start: 'top 80%',
        },
      });

      // Flow steps
      gsap.from('.impact-flow-step', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.impact-flow',
          start: 'top 80%',
        },
      });

      // Count-up animation for stats
      summaryStats.forEach((stat) => {
        const el = document.getElementById(`impact-counter-${stat.id}`);
        if (el) {
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: stat.value,
              duration: 2,
              ease: 'power1.out',
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-soft-cream pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 space-y-20">
        {/* Hero / Summary */}
        <section className="impact-hero grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] items-center">
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-hope-blue/10 text-hope-blue">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              Impact in Embalenhle, Mpumalanga
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              Impact you can feel
              <span className="block text-hope-blue">in everyday stories.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              At INkosinami Community Center, impact is not abstract. It is a child who sleeps
              with a full stomach, a learner who finishes their homework, and a teenager who
              starts to believe in tomorrow again.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <Users className="h-3.5 w-3.5 text-primary" />
                300+ children reached each year
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <Utensils className="h-3.5 w-3.5 text-warm-orange" />
                Thousands of meals served
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <BookOpen className="h-3.5 w-3.5 text-hope-blue" />
                Homework, life skills & holiday care
              </span>
            </div>
          </div>

          <div className="relative max-w-xl lg:ml-auto">
            <div className="absolute -top-10 -right-10 h-52 w-52 rounded-3xl bg-hope-blue/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-3xl bg-warm-orange/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl bg-primary shadow-xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1607962837359-92e989b79c29?q=80&w=1800&auto=format&fit=crop"
                alt="Children playing at a community program"
                className="h-80 w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-sm text-white/85 space-y-2">
                <p className="text-xs font-medium tracking-[0.24em] uppercase text-white/70 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <Heart className="h-3.5 w-3.5 text-warm-orange" />
                  </span>
                  Impact in motion
                </p>
                <p>
                  Some children go to bed hungry. Others go to bed hopeful — because of the meals,
                  mentorship, and love they receive at INkosinami.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* By the numbers */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
                By the numbers
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                What your support makes possible.
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-gray-600">
              Every statistic below represents real children in Embalenhle — with names, dreams,
              and stories that matter.
            </p>
          </div>

          <div className="impact-stat-grid grid gap-5 md:grid-cols-4">
            {summaryStats.map((stat, index) => (
              <div
                key={stat.id}
                className={`impact-stat-card relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 md:p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  index === 0 ? 'md:col-span-2 bg-primary text-white border-primary/30' : ''
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl ${
                    index === 0
                      ? 'bg-hope-blue/30'
                      : index === 1
                      ? 'bg-warm-orange/15'
                      : index === 2
                      ? 'bg-hope-blue/15'
                      : 'bg-primary/8'
                  }`}
                />

                <div className="relative z-10 space-y-3">
                  <p
                    className={`text-[0.7rem] md:text-xs font-medium tracking-[0.25em] uppercase ${
                      index === 0 ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      id={`impact-counter-${stat.id}`}
                      className={`text-3xl md:text-4xl font-semibold tracking-tight ${
                        index === 0 ? 'text-white' : 'text-primary'
                      }`}
                    >
                      0
                    </span>
                    <span
                      className={`text-2xl font-semibold ${
                        index === 0 ? 'text-blue-200' : 'text-hope-blue'
                      }`}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <p
                    className={`text-xs md:text-sm leading-relaxed ${
                      index === 0 ? 'text-white/80' : 'text-gray-600'
                    }`}
                  >
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stories */}
        <section className="impact-stories space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
                Stories from Embalenhle
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                What impact feels like on the ground.
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-gray-600">
              Names have been changed to protect privacy, but the stories are real. This is what
              your support looks like in everyday life.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {storyCards.map((story) => (
              <article
                key={story.name}
                className="impact-story-card relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-hope-blue/10 blur-2xl" />
                <div className="relative z-10 space-y-4">
                  <Quote className="h-6 w-6 text-warm-orange" />
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">“{story.quote}”</p>
                  <div className="pt-2 text-xs md:text-sm text-gray-500">
                    <p className="font-semibold text-primary">{story.name}</p>
                    <p>{story.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How your support flows */}
        <section className="impact-flow space-y-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
              How your support flows
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              From your gift to a child’s everyday reality.
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              We keep our impact simple and focused: every rand given is stretched carefully to
              serve children with dignity, transparency, and care.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="impact-flow-step rounded-3xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-hope-blue/10 text-hope-blue">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gray-500">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-primary">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Soft CTA */}
        <section className="rounded-3xl bg-primary text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-20 h-56 w-56 rounded-full bg-hope-blue/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-20 h-56 w-56 rounded-full bg-warm-orange/25 blur-3xl" />

          <div className="relative space-y-3 max-w-xl">
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-white/70">
              Join the story
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Help write the next chapter of impact in Embalenhle.
            </h2>
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              Your giving, volunteering, or partnership keeps this lifeline strong. Together, we
              can make sure more children go to bed hopeful, not hungry.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-3 md:gap-4">
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Heart className="h-4 w-4 text-warm-orange fill-warm-orange" />
              Donate now
            </a>
            <a
              href="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-sm font-semibold text-white px-6 py-3 hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              See the programs
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
