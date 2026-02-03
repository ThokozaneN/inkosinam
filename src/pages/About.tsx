import { Link } from 'react-router-dom';
import { MapPin, Heart, Users, BookOpen, Sprout, Shield, Clock } from 'lucide-react';

export function About() {
  return (
    <div className="bg-soft-cream pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 space-y-24">
        {/* Hero section with image */}
        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
              About INkosinam
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              A lifeline for children in
              <span className="block text-hope-blue">Embalenhle, Mpumalanga.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              INkosinami Community Center is a grassroots non-profit in Embalenhle, Mpumalanga,
              creating a safe space where orphaned and vulnerable children find food, care,
              and a future that feels possible.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200 backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-hope-blue" />
                10+ years serving children
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200 backdrop-blur">
                <Shield className="h-3.5 w-3.5 text-warm-orange" />
                8 years registered NPO
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200 backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Embalenhle, Mpumalanga
              </span>
            </div>
          </div>

          <div className="relative max-w-xl lg:ml-auto">
            <div className="absolute -top-12 -right-10 h-56 w-56 rounded-3xl bg-hope-blue/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-48 w-48 rounded-3xl bg-warm-orange/15 blur-3xl" />

            <div className="group relative overflow-hidden rounded-3xl bg-primary shadow-xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1800&auto=format&fit=crop"
                alt="Children at a community program"
                className="h-80 w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="relative z-10 flex flex-col justify-between h-full p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-white/80 uppercase tracking-[0.22em]">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <Heart className="h-3.5 w-3.5 text-warm-orange" />
                  </span>
                  Restoring hope, one child at a time
                </div>
                <div className="space-y-2">
                  <p className="text-white/85 text-sm md:text-base max-w-md">
                    Some children go to bed hungry. Others go to bed hopeful — because of
                    the meals, mentorship, and love they receive at INkosinam.
                  </p>
                  <p className="flex items-center gap-2 text-xs text-white/60">
                    <MapPin className="h-3.5 w-3.5" />
                    Embalenhle, Mpumalanga, South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story & quick facts as cards */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-start">
          <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              What began as a small act of kindness — sharing cooked meals from home — has
              grown into a community foundation that walks alongside children in Embalenhle
              every single week.
            </p>
            <p>
              For over <span className="font-semibold text-primary">10 years</span>, INkosinam has been a
              steady presence in the lives of children who are often overlooked. We offer
              more than food: we provide emotional support, homework help, and structured
              programs that keep children safe, engaged, and hopeful.
            </p>
            <p>
              Officially registered as an NPO for
              <span className="font-semibold text-primary"> 8 years</span>, our legitimacy is rooted in
              something deeper than paperwork: the trust of families, schools, and local
              leaders who see the difference every day.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="group rounded-2xl bg-white border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-hope-blue/40 hover:shadow-lg">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-hope-blue/10 text-hope-blue">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-primary mb-1">Where we serve</h3>
              <p className="text-sm text-gray-600">
                Embalenhle, Mpumalanga — a township where many children face food insecurity
                and limited safe spaces.
              </p>
            </div>

            <div className="group rounded-2xl bg-white border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-warm-orange/40 hover:shadow-lg">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-warm-orange/10 text-warm-orange">
                <Clock className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-primary mb-1">Years of care</h3>
              <p className="text-sm text-gray-600">
                More than a decade of consistency — showing up for children week after week,
                year after year.
              </p>
            </div>

            <div className="group rounded-2xl bg-white border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-hope-blue/40 hover:shadow-lg">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-primary mb-1">Registered & accountable</h3>
              <p className="text-sm text-gray-600">
                8 years as a formally registered NPO, committed to transparency and responsible stewardship.
              </p>
            </div>

            <div className="group rounded-2xl bg-white border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-warm-orange/40 hover:shadow-lg">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-hope-blue/10 text-hope-blue">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-primary mb-1">Who we serve</h3>
              <p className="text-sm text-gray-600">
                Orphaned and vulnerable children who need a circle of care, not just a plate of food.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, vision & values cards */}
        <section className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Who we are. Why we exist.
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              We believe no child should be defined by their circumstances. Our mission and
              vision are rooted in dignity, opportunity, and a deep love for our community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-hope-blue/40 hover:shadow-lg">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-hope-blue/10 px-3 py-1 text-xs font-medium text-hope-blue">
                <Heart className="h-3.5 w-3.5" /> Mission
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                To provide care, education, and life skills to orphaned and vulnerable children in
                Embalenhle, creating a safe, nurturing environment where they can grow, learn,
                dream, and know they are loved.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-warm-orange/40 hover:shadow-lg">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-warm-orange/10 px-3 py-1 text-xs font-medium text-warm-orange">
                <Sprout className="h-3.5 w-3.5" /> Vision
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                A community where every child — regardless of background — has access to food,
                education, and opportunities that unlock a hopeful, dignified future.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: 'Dignity',
                body: 'Every child is seen, known, and treated with honour and respect.',
                icon: Shield,
              },
              {
                title: 'Consistency',
                body: 'We show up week after week, not just when it is convenient.',
                icon: Clock,
              },
              {
                title: 'Community',
                body: 'We partner with families, schools, and local leaders in Embalenhle.',
                icon: Users,
              },
              {
                title: 'Hope',
                body: 'We speak to the future, not just the present struggle.',
                icon: Heart,
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group bg-white rounded-2xl p-5 border border-gray-100 text-sm text-gray-600 leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-hope-blue/40 hover:shadow-md"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <value.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-hope-blue mb-1">
                  {value.title}
                </p>
                <p>{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Embalenhle + image cards */}
        <section className="grid gap-10 lg:grid-cols-2 items-stretch">
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Why Embalenhle matters to us.
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Embalenhle is more than a location on a map — it is home. Children here grow up
              between overcrowded classrooms, high unemployment, and few safe spaces to simply
              be children.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              INkosinam steps into that gap. We create a stable centre of care where children
              can eat a warm meal, finish their homework, build friendships, and discover that
              their story can be different from what they see around them.
            </p>

            <div className="mt-4 rounded-3xl bg-primary text-white p-7 md:p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-hope-blue/30 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-warm-orange/30 blur-3xl" />

              <div className="relative space-y-4">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-white/70">
                  How we support children
                </p>
                <ul className="space-y-3 text-sm md:text-base text-white/85">
                  <li>• Daily or weekly cooked meals for children who might not eat at home.</li>
                  <li>• Homework assistance and school support in a calm, structured environment.</li>
                  <li>• Life skills, holiday programs, and mentorship that build confidence and resilience.</li>
                  <li>• A trusted place where children are listened to, protected, and encouraged.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 h-56 sm:h-64 lg:h-72">
              <img
                src="https://images.unsplash.com/photo-1600758201742-6be9eb37a25e?q=80&w=1600&auto=format&fit=crop"
                alt="Child learning during homework support"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90">
                Homework assistance and safe after-school support.
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 h-28 sm:h-32">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1600&auto=format&fit=crop"
                  alt="Children eating a meal together"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/0 to-black/10" />
                <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90">
                  Cooked meals that keep children nourished and focused.
                </div>
              </div>

              <div className="group rounded-3xl bg-white border border-dashed border-hope-blue/40 p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-hope-blue hover:shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-hope-blue/10 text-hope-blue">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-primary">Education & life skills</p>
                </div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  From homework clubs to life skills sessions, we invest in the minds and hearts
                  of children so they can dream beyond their current reality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Soft call to action */}
        <section className="border border-gray-200 rounded-3xl p-8 md:p-10 bg-white/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
              Stand with children in Embalenhle.
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Your partnership helps us keep the lights on, the pots full, and the doors open
              for every child who walks in. Join us as a donor, volunteer, or partner
              organisation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-hope-blue text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
            >
              Donate
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary/15 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              Partner with us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
