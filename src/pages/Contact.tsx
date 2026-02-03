import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, MessageCircle, Clock, Heart, Users, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.contact-card', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-soft-cream pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 space-y-16">
        {/* Hero / intro */}
        <section className="contact-hero grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] items-center">
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
              Contact INkosinami
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              Let&apos;s connect.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Whether you&apos;re a donor, volunteer, partner, or caregiver, we&apos;d love to hear from you.
              Reach out to INkosinami Community Center in Embalenhle, Mpumalanga.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <Heart className="h-3.5 w-3.5 text-warm-orange" />
                Donors & sponsors
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <Users className="h-3.5 w-3.5 text-hope-blue" />
                Volunteers
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <Mail className="h-3.5 w-3.5 text-primary" />
                NGOs & partners
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200">
                <MessageCircle className="h-3.5 w-3.5 text-warm-orange" />
                Parents & caregivers
              </span>
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2 mt-2 text-xs md:text-sm text-gray-700 border border-gray-200 shadow-sm">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-primary">Based in Embalenhle, Mpumalanga</p>
                <p className="text-gray-500">Serving children and families in the surrounding community.</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-xl lg:ml-auto">
            <div className="absolute -top-10 -right-10 h-52 w-52 rounded-3xl bg-hope-blue/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-3xl bg-warm-orange/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 md:p-7 shadow-xl border border-white/10 space-y-5">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-hope-blue/30 blur-3xl" />
              <div className="absolute -bottom-16 -left-20 h-40 w-40 rounded-full bg-warm-orange/25 blur-3xl" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                  <MessageCircle className="h-3.5 w-3.5 text-warm-orange" />
                  Best ways to reach us
                </div>

                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold">WhatsApp (fastest)</p>
                      <p className="text-white/80">+27 12 345 6789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold">Call the center</p>
                      <p className="text-white/80">+27 12 345 6789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/80">hello@inkosinami.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold">Office hours</p>
                      <p className="text-white/80">Mon – Fri, 09:00 – 16:00</p>
                    </div>
                  </div>
                </div>

                <p className="relative text-xs text-white/70 border-t border-white/10 pt-3 mt-2">
                  If you are contacting us about a vulnerable child in urgent need, please send a
                  WhatsApp and mark it as <span className="font-semibold">URGENT</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form + details */}
        <section className="contact-grid grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] items-start">
          {/* Contact form */}
          <div className="contact-card rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
                Send us a message.
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Share a few details and our team will respond as soon as we can. We aim to reply
                within 2–3 working days.
              </p>
            </div>

            <form
              className="space-y-4 text-sm"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                    placeholder="+27..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Reason for contacting</label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                    defaultValue="donation"
                  >
                    <option value="donation">I want to donate or sponsor</option>
                    <option value="volunteer">I want to volunteer</option>
                    <option value="partner">Partnership / corporate / NGO</option>
                    <option value="caregiver">I&apos;m a parent / caregiver</option>
                    <option value="media">Media / speaking / other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">How can we help?</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60 resize-none"
                  placeholder="Share as much detail as you can so we can direct your message to the right person."
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-hope-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors w-full md:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  Send message
                </button>
                <p className="text-[11px] text-gray-500 max-w-xs">
                  We respect your privacy and will never share your details without your
                  permission.
                </p>
              </div>
            </form>
          </div>

          {/* Details & quick contact cards */}
          <div className="space-y-4">
            <div className="contact-card rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-[0.24em] uppercase text-gray-500">
                    Visit us
                  </p>
                  <p className="text-sm font-semibold text-primary">INkosinami Community Center</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1.5">
                <p>Embalenhle, Mpumalanga</p>
                <p>South Africa</p>
                <p className="text-xs text-gray-500">
                  Contact us for precise directions and visiting times. For the safety of the
                  children, visits are by arrangement only.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs font-semibold text-hope-blue hover:text-blue-700 mt-1"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                Request directions
              </button>
            </div>

            <div className="contact-card rounded-3xl bg-primary text-white p-6 md:p-7 space-y-4 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-hope-blue/40 blur-2xl" />
              <div className="absolute -bottom-12 -left-14 h-32 w-32 rounded-full bg-warm-orange/30 blur-2xl" />

              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-[0.24em] uppercase text-white/70">
                      Need a quick response?
                    </p>
                    <p className="text-sm font-semibold">Start a WhatsApp chat.</p>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-white/85">
                  Use WhatsApp for urgent queries, sponsorship confirmations, or to send proof of
                  payment for donations.
                </p>

                <a
                  href="https://wa.me/27123456789"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-5 py-2.5 text-xs md:text-sm font-semibold shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  WhatsApp INkosinami
                </a>

                <div className="text-[11px] text-white/70">
                  <p>Prefer email? Reach us at</p>
                  <p className="font-medium">hello@inkosinami.org</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
