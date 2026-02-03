import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "./utils/cn";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Impact", href: "#impact" },
  { label: "Get involved", href: "#get-involved" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
] as const;

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  helper?: string;
};

const IMPACT_STATS: Stat[] = [
  {
    label: "Years of service",
    value: 10,
    suffix: "+",
    helper: "More than a decade of daily, on-the-ground work.",
  },
  {
    label: "Meals served",
    value: 1000,
    suffix: "+",
    helper: "Hot plates of food shared around real tables.",
  },
  {
    label: "Children supported",
    value: 300,
    suffix: "+",
    helper: "Children who have found consistency, care, and belonging.",
  },
  {
    label: "Years registered as an NPO",
    value: 8,
    helper: "Formally registered and accountable to our community.",
  },
];

const PROGRAMS = [
  {
    id: "meals",
    name: "Cooked Meals Program",
    icon: "🍲",
    focus: "Daily cooked meals",
    description:
      "Warm, reliable meals so children do not go to bed hungry.",
  },
  {
    id: "homework",
    name: "Homework Assistance",
    icon: "📚",
    focus: "Academic support",
    description: "Quiet space, help with homework, and reading circles.",
  },
  {
    id: "life-skills",
    name: "Life Skills",
    icon: "🌱",
    focus: "Character & resilience",
    description: "Simple, practical tools for everyday life and choices.",
  },
  {
    id: "holiday",
    name: "Holiday Programs",
    icon: "🎉",
    focus: "Safe school holidays",
    description: "Structured days when school is closed, not left alone.",
  },
] as const;

const WHATSAPP_NUMBER = "27720000000"; // Placeholder – replace with real number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi INkosinami Drop-In Center team, I would love to learn more about how I can support your work."
);

export function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const statValueRefs = useRef<HTMLSpanElement[]>([]);
  const lenisRef = useRef<any>(null);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [navIsSolid, setNavIsSolid] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isDonateCardOpen, setIsDonateCardOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Smooth scrolling with Lenis
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Respect user preference: avoid JS-driven smooth scroll if they prefer reduced motion
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  // Header background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setNavIsSolid(y > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preloader animation
  useEffect(() => {
    const preloaderEl = preloaderRef.current;
    if (!preloaderEl) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If user prefers reduced motion, skip heavy timeline and hide preloader quickly
    if (prefersReducedMotion) {
      gsap.set(preloaderEl, { autoAlpha: 0 });
      setIsPreloading(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0 });

      tl.to(".ink-preloader .col", {
        top: "0",
        duration: 3,
        ease: "power4.inOut",
      });

      tl.to(
        ".ink-preloader .c-1 .item",
        {
          top: "0",
          stagger: 0.25,
          duration: 3,
          ease: "power4.inOut",
        },
        "-=2"
      );

      tl.to(
        ".ink-preloader .c-2 .item",
        {
          top: "0",
          stagger: -0.25,
          duration: 3,
          ease: "power4.inOut",
        },
        "-=4"
      );

      tl.to(
        ".ink-preloader .c-3 .item",
        {
          top: "0",
          stagger: 0.25,
          duration: 3,
          ease: "power4.inOut",
        },
        "-=4"
      );

      tl.to(
        ".ink-preloader .c-4 .item",
        {
          top: "0",
          stagger: -0.25,
          duration: 3,
          ease: "power4.inOut",
        },
        "-=4"
      );

      tl.to(
        ".ink-preloader .c-5 .item",
        {
          top: "0",
          stagger: 0.25,
          duration: 3,
          ease: "power4.inOut",
        },
        "-=4"
      );

      tl.to(
        ".ink-preloader-grid",
        {
          scale: 6,
          duration: 4,
          ease: "power4.inOut",
        },
        "-=2"
      );

      tl.to(
        ".ink-preloader .preview img",
        {
          top: 0,
          stagger: 0.075,
          duration: 1,
          ease: "power3.out",
        },
        "+=0.4"
      );

      tl.to(
        ".ink-preloader .icon-symbol",
        {
          scale: 1,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.to(
        preloaderEl,
        {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            setIsPreloading(false);
          },
        },
        "+=0.3"
      );
    }, preloaderEl);

    return () => ctx.revert();
  }, []);

  // GSAP: hero, section reveals and counters
  useEffect(() => {
    if (!appRef.current || isPreloading) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If user prefers reduced motion, avoid animations but ensure counters show final values
    if (prefersReducedMotion) {
      statValueRefs.current.forEach((el, index) => {
        if (!el) return;
        const end = IMPACT_STATS[index]?.value ?? 0;
        el.textContent = end.toString();
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Hero intro timeline (runs after preloader)
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTl.from(".hero-heading", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        filter: "blur(8px)",
      });

      heroTl.from(
        ".hero-tag",
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        "-=0.45"
      );

      heroTl.from(
        ".hero-cta",
        {
          y: 22,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.5"
      );

      // Hero subtle parallax as you scroll past it
      gsap.to(".hero-bg", {
        yPercent: -6,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Section fade in on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".section");
      sections.forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });

      // Programs bento grid: reveal + subtle parallax
      const programCards = gsap.utils.toArray<HTMLElement>(".program-card");
      if (programCards.length) {
        gsap.from(programCards, {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "#programs",
            start: "top 70%",
          },
        });

        programCards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -8 : 8;
          gsap.to(card, {
            yPercent: direction,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      // About section background parallax
      const aboutBg = document.querySelector<HTMLElement>(".about-bg");
      if (aboutBg) {
        gsap.fromTo(
          aboutBg,
          { yPercent: -12, opacity: 0.0 },
          {
            yPercent: 6,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Trust cards reveal
      const trustCards = gsap.utils.toArray<HTMLElement>(".trust-card");
      if (trustCards.length) {
        gsap.from(trustCards, {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "#trust",
            start: "top 75%",
          },
        });
      }

      // Gallery cards reveal
      const galleryCards = gsap.utils.toArray<HTMLElement>(".gallery-card");
      if (galleryCards.length) {
        gsap.from(galleryCards, {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "#donate",
            start: "top 80%",
          },
        });
      }

      // Get involved cards: reveal + subtle parallax
      const involveCards = gsap.utils.toArray<HTMLElement>(".involve-card");
      if (involveCards.length) {
        gsap.from(involveCards, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "#get-involved",
            start: "top 75%",
          },
        });

        involveCards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -6 : 6;
          gsap.to(card, {
            yPercent: direction,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      // Animated counters
      statValueRefs.current.forEach((el) => {
        if (!el) return;
        const end = Number(el.dataset.target ?? 0);
        const obj = { value: 0 };

        gsap.to(obj, {
          value: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.value).toString();
          },
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, [isPreloading]);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    if (lenisRef.current && typeof lenisRef.current.scrollTo === "function") {
      lenisRef.current.scrollTo(target, { offset: -72 });
    } else {
      (target as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setIsMobileNavOpen(false);
    scrollToSection(href);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSubmitted(true);
    (event.currentTarget as HTMLFormElement).reset();

    window.setTimeout(() => {
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-[#F9FAF7] text-slate-900 antialiased"
    >
      {isPreloading && (
        <div ref={preloaderRef} className="ink-preloader">
          <div className="ink-preloader-grid">
            <div className="col c-1">
              <div className="item">
                <img
                  src="images/mall-visit.jpeg"
                  alt="Children visit mall"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="item">
                <img
                  src="images/clothing-collection.jpeg"
                  alt="Clothing Collection"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="item">
                <img
                  src="images/spur-visit.jpg"
                  alt="Spur Visit"
                />
              </div>
              <div className="item">
                <img
                  src="images/food-donations.jpeg"
                  alt="Food Donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/donation.jpeg"
                  alt="Money Donation"
                />
              </div>
            </div>
            <div className="col c-2">
              <div className="item">
                <img
                  src="images/clothing-donations.jpeg"
                  alt="Clothing Donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/furniture-dontations.jpeg"
                  alt="Furniture Donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/absa-visit.jpeg"
                  alt="Absa Donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/more-donations.jpeg"
                  alt="Donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/food-preparation.jpeg"
                  alt="Food preparations"
                />
              </div>
            </div>
            <div className="col c-3">
              <div className="item">
                <img
                  src="images/outdoor-activities.jpeg"
                  alt="Outdoor activity"
                />
              </div>
              <div className="item">
                <img
                  src="images/mall-visit.jpeg"
                  alt="Homework help"
                />
              </div>
              <div className="item">
                <img
                  src="images/Originals/children-hero.png" /*Center Image*/
                  alt="Hands together"
                />
              </div>
              <div className="item">
                <img
                  src="images/spur-visit.jpg"
                  alt="Spur visit"
                />
              </div>
              <div className="item">
                <img
                  src="images/donation.jpeg"
                  alt="Donations"
                />
              </div>
            </div>
            <div className="col c-4">
              <div className="item">
                <img
                  src="images/clothing-collection.jpeg"
                  alt="Clothing collection"
                />
              </div>
              <div className="item">
                <img
                  src="images/debonairs-visit.jpg"
                  alt="Debonairs donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/clothing-donations.jpeg"
                  alt="Clothing donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/center.jpg"
                  alt="Center"
                />
              </div>
              <div className="item">
                <img
                  src="images/more-donations.jpeg"
                  alt="Donations"
                />
              </div>
            </div>
            <div className="col c-5">
              <div className="item">
                <img
                  src="images/furniture-dontations.jpeg"
                  alt="Furinture Donations"
                />
              </div>
              <div className="item">
                <img
                  src="images/Originals/children-hero.png"
                  alt="Hero"
                />
              </div>
              <div className="item">
                <img
                  src="images/outdoor-activities.jpeg"
                  alt="Outdoor activity"
                />
              </div>
              <div className="item">
                <img
                  src="images/absa-visit.jpeg"
                  alt="Absa"
                />
              </div>
              <div className="item">
                <img
                  src="images/food-preparation.jpeg"
                  alt="Food"
                />
              </div>
            </div>
          </div>

          <div className="content">
            <div className="hero">
              <div className="icon">
                <span className="icon-symbol">+</span>
              </div>
              <div className="icon-2">
                <span className="icon-symbol">+</span>
              </div>
            </div>

            <footer>
              <div className="preview">
                <img
                  src="images/Originals/children-hero.png"
                  alt="Preview 1"
                />
                <img
                  src="images/mall-visit.jpeg"
                  alt="Preview 2"
                />
                <img
                  src="images/spur-visit.jpg"
                  alt="Preview 3"
                />
                <img
                  src="images/outdoor-activities.jpeg"
                  alt="Preview 4"
                />
                <img
                  src="images/furniture-dontations.jpeg"
                  alt="Preview 5"
                />
                <img
                  src="images/center.jpg"
                  alt="Preview 6"
                />
                <img
                  src="images/clothing-donations.jpeg"
                  alt="Preview 7"
                />
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Top navigation */}
      <header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center transition-all duration-300",
          navIsSolid ? "top-3" : "top-0"
        )}
      >
        <nav
          className={cn(
            "relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 transition-all duration-300",
            navIsSolid
              ? "rounded-full border border-slate-200/80 bg-white/90 shadow-lg backdrop-blur-md"
              : "bg-transparent"
          )}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3 group"
          >
            <div className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors",
              navIsSolid 
                ? "bg-slate-900 text-white" 
                : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
            )}>
              IN
            </div>
            <div>
              <span
                className={cn(
                  "text-[15px] font-semibold tracking-tight transition-colors",
                  navIsSolid ? "hidden" : "text-white"
                )}
              >
                Inkosinami
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:ml-10 lg:flex">
            {NAV_ITEMS.filter(item => item.label !== "Donate").map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative rounded-full px-3 py-1 text-[13px] font-medium transition-all duration-200",
                  navIsSolid
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setIsDonateCardOpen(true)}
              className={cn(
                "rounded-full px-5 py-2 text-[13px] font-medium transition-all",
                navIsSolid 
                  ? "bg-slate-900 text-white hover:bg-slate-800" 
                  : "bg-white text-slate-900 hover:bg-white/90"
              )}
            >
              Donate
            </button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              navIsSolid 
                ? "bg-slate-100 text-slate-900" 
                : "bg-white/20 backdrop-blur-sm text-white"
            )}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex flex-col gap-[5px]">
              <span
                className={cn(
                  "h-[2px] w-5 rounded-full transition-all duration-300",
                  navIsSolid ? "bg-slate-900" : "bg-white",
                  isMobileNavOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-5 rounded-full transition-all duration-300",
                  navIsSolid ? "bg-slate-900" : "bg-white",
                  isMobileNavOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-5 rounded-full transition-all duration-300",
                  navIsSolid ? "bg-slate-900" : "bg-white",
                  isMobileNavOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>

          {isMobileNavOpen && (
            <div
              className={cn(
                "absolute right-4 top-[64px] w-[calc(100%-2.5rem)] rounded-2xl border border-slate-200 bg-white/95 px-4 pb-4 pt-3 shadow-lg backdrop-blur-md lg:hidden"
              )}
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.filter((item) => item.label !== "Donate").map(
                  (item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="rounded-full px-4 py-3 text-[15px] font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100/90"
                    >
                      {item.label}
                    </a>
                  )
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setIsDonateCardOpen(true);
                  }}
                  className="mt-3 rounded-full bg-slate-900 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Donate
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-0">
        {/* Hero */}
        <section
          id="home"
          className="section relative border-b border-slate-200"
        >
          <div className="hero-bg absolute inset-0 overflow-hidden">
            <img
              src="images/children-hero.png" /*HERO BACKGROUND*/
              alt="Children sharing a meal at a community programme"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/75" />
          </div>

          <div className="hero-content relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-4">
            <h1 className="hero-heading max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Care for children who need it most.
            </h1>
            {/* Trust meta tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="hero-tag inline-flex items-center rounded-full border border-emerald-300/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-50 backdrop-blur-sm sm:px-3.5 sm:text-xs">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.3)]" />
                <span className="uppercase tracking-[0.16em] text-emerald-100">
                  NPO Reg. No. to be confirmed
                </span>
              </span>
              <span className="hero-tag inline-flex items-center rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm sm:px-3.5 sm:text-xs">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="uppercase tracking-[0.16em]">
                  Embalenhle · Mpumalanga
                </span>
              </span>
            </div>
            {/* Program tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {["Meals", "Homework", "Life skills", "Community"].map((tag) => (
                <span
                  key={tag}
                  className="hero-tag inline-flex items-center rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm sm:px-3.5 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDonateCardOpen(true)}
                className="hero-cta rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-slate-900 shadow-sm hover:bg-white/90"
              >
                Donate now
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("#programs")}
                className="hero-cta rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-medium text-white ring-1 ring-white/20 hover:bg-white/15"
              >
                View programs
              </button>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section
          id="impact"
          className="section border-b border-slate-200 bg-[#F9FAF7]"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Impact
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  More than numbers on a page.
                </h2>
                <p className="max-w-md text-sm text-slate-600 sm:text-[15px]">
                  Each figure is a quiet, accumulated yes: another meal,
                  another homework session, another child who is not alone
                  that day.
                </p>
              </div>
              <div className="max-w-xs space-y-2 text-[12px] text-slate-500">
                <p>
                  These are conservative estimates based on daily
                  attendance and programme records.
                </p>
                <p>
                  A simple online impact dashboard is planned for the next
                  phase.
                </p>
              </div>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {IMPACT_STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm transition-colors hover:border-slate-300"
                >
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 flex items-baseline gap-1 text-2xl font-semibold text-slate-900 sm:text-[28px]">
                    <span
                      ref={(el) => {
                        if (el) statValueRefs.current[index] = el;
                      }}
                      data-target={stat.value}
                    >
                      0
                    </span>
                    {stat.suffix && (
                      <span className="text-lg font-semibold text-slate-900">
                        {stat.suffix}
                      </span>
                    )}
                  </dd>
                  {stat.helper && (
                    <p className="mt-2 text-[11px] text-slate-500">
                      {stat.helper}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Programs */}
        <section
          id="programs"
          className="section border-b border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Programs
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Simple programs that meet real needs.
                </h2>
                <p className="max-w-md text-sm text-slate-600 sm:text-[15px]">
                  Food. Learning support. Life skills. Safe holidays. No
                  frills, just what children need most.
                </p>
              </div>
              <p className="max-w-xs text-[12px] text-slate-500">
                Each tile below reflects a real part of a child's day at Inkosinami  from arriving hungry to leaving seen, fed, and supported.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 auto-rows-[minmax(160px,_1fr)] lg:auto-rows-[minmax(190px,_1fr)]">
              {/* Cooked meals  main tile */}
              <article className="program-card relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 px-5 py-6 text-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.55)] sm:px-6 sm:py-7 md:col-span-2 md:row-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">
                      {PROGRAMS[0].focus}
                    </p>
                    <h3 className="mt-2 text-base font-semibold sm:text-[17px]">
                      {PROGRAMS[0].name}
                    </h3>
                    <p className="mt-2 max-w-xs text-[13px] text-slate-200">
                      {PROGRAMS[0].description}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
                    <span aria-hidden="true">{PROGRAMS[0].icon}</span>
                  </div>
                </div>
                <p className="mt-4 text-[12px] text-slate-300">
                  Children arrive straight from school. A hot plate, a calm
                  table, and familiar faces change how the rest of the day
                  feels.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection("#donate")}
                  className="mt-5 inline-flex items-center rounded-full bg-white text-[12px] font-medium text-slate-900 px-4 py-2 hover:bg-white/90"
                >
                  Sponsor daily meals
                </button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/60 via-transparent" />
              </article>

              {/* Homework tile */}
              <article className="program-card relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 px-5 py-5 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.09)] sm:px-6 sm:py-6 md:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      {PROGRAMS[1].focus}
                    </p>
                    <h3 className="mt-2 text-base font-semibold sm:text-[15px]">
                      {PROGRAMS[1].name}
                    </h3>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/5 text-lg">
                    <span aria-hidden="true">{PROGRAMS[1].icon}</span>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-slate-600">
                  {PROGRAMS[1].description}
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  A quiet table, help with reading, and someone to say “well done” can shift a child's confidence.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection("#donate")}
                  className="mt-4 text-[12px] font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Support homework club
                </button>
              </article>

              {/* Life skills tile */}
              <article className="program-card relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-[#F9FAF7] px-5 py-5 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6 md:col-span-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      {PROGRAMS[2].focus}
                    </p>
                    <h3 className="mt-2 text-base font-semibold sm:text-[15px]">
                      {PROGRAMS[2].name}
                    </h3>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-lg">
                    <span aria-hidden="true">{PROGRAMS[2].icon}</span>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-slate-600">
                  {PROGRAMS[2].description}
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  Small, honest conversations about choices, friendships,
                  and hope.
                </p>
              </article>

              {/* Holiday programs tile */}
              <article className="program-card relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-5 py-5 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6 md:col-span-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      {PROGRAMS[3].focus}
                    </p>
                    <h3 className="mt-2 text-base font-semibold sm:text-[15px]">
                      {PROGRAMS[3].name}
                    </h3>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/10 text-lg">
                    <span aria-hidden="true">{PROGRAMS[3].icon}</span>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-slate-600">
                  {PROGRAMS[3].description}
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  When school closes, Inkosinami helps keep days structured,
                  safe, and joyful.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection("#donate")}
                  className="mt-4 text-[12px] font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Back holiday programs
                </button>
              </article>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="section relative overflow-hidden border-b border-slate-200 bg-[#F9FAF7]"
        >
          {/* Soft animated background plate */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 bottom-[-30%] -z-10">
            <div className="about-bg mx-auto h-full max-w-5xl rounded-[48px] bg-gradient-to-b from-sky-100/70 via-emerald-50/70 to-transparent blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="grid gap-10 md:grid-cols-[minmax(0,_1.4fr)_minmax(0,_1fr)] md:items-start">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  About Inkosinami
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  A small, steady place in the middle of everything.
                </h2>
                <p className="text-sm text-slate-600 sm:text-[15px]">
                  For more than a decade, Inkosinami Drop-In Center has been a daily anchor
                  for children who need somewhere safe to land after school  to eat,
                  finish homework, and simply be children again.
                </p>
                <p className="text-sm text-slate-600 sm:text-[15px]">
                  What began in a home kitchen has grown into a registered, community-run
                  centre. The work is still intentionally small: face-to-face, name-by-name,
                  built on consistent presence rather than big campaigns.
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-600">
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-medium">10+ years present</span>
                  </div>
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span className="ml-2 font-medium">8 years registered as an NPO</span>
                  </div>
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span className="ml-2 font-medium">Community-led and rooted locally</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-5">
                  <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                    Mission
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 sm:text-[15px]">
                    To provide daily care, education support, and life skills to orphaned
                    and vulnerable children in our community.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-5">
                  <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                    Vision
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 sm:text-[15px]">
                    A neighbourhood where every child has access to food, learning,
                    belonging, and a hopeful sense of what is possible.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-5">
                  <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                    How we work
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-600 sm:text-[15px]">
                    <li>Quiet, consistent presence over quick campaigns.</li>
                    <li>Dignity-first care that protects children's privacy.</li>
                    <li>Partnership with local schools, churches, and neighbours.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section
          id="founder"
          className="section border-b border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="grid gap-10 md:grid-cols-[minmax(0,_1.1fr)_minmax(0,_1.3fr)] md:items-center">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-emerald-100/60 via-sky-50 to-transparent blur-2xl" />
                <figure className="overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                  <img
                    src="images/esther-phindile-kubeka.png"
                    alt="Portrait of founder Esther Phindile Kubeka"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Meet the founder
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Esther Phindile Kubeka
                </h2>
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Founder · Community leader
                </p>
                <p className="text-sm text-slate-600 sm:text-[15px]">
                  Esther started Inkosinami Drop-In Center after seeing children in her
                  neighbourhood going to bed hungry and unsupported with schoolwork.
                </p>
                <p className="text-sm text-slate-600 sm:text-[15px]">
                  What began with cooking extra pots of food has become a daily rhythm of
                  meals, homework, listening, and quiet advocacy for children who might
                  otherwise be overlooked.
                </p>

                <div className="mt-4 border-l-2 border-slate-900/70 pl-4 sm:pl-5">
                  <p className="text-base font-semibold leading-relaxed text-slate-900 sm:text-lg md:text-xl">
                    "I cannot change everything for every child, but I can make sure that in
                    this small place, they are known, they are fed, and they are not alone."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get involved */}
        <section
          id="get-involved"
          className="section border-b border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Get involved
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Three simple ways to stand with us.
                </h2>
                <p className="max-w-md text-sm text-slate-600 sm:text-[15px]">
                  Whether you give monthly, offer your time, or partner through your
                  organisation, you become part of a child's ordinary, hopeful day.
                </p>
              </div>
              <p className="max-w-xs text-[12px] text-slate-500">
                No contribution is “too small” when it repeats over time. Quiet, consistent
                support is what keeps the doors open.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3 lg:gap-6">
              {/* Donors */}
              <article className="involve-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-5 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <span className="text-xs" aria-hidden="true">
                      💚
                    </span>
                    <span>Donors & sponsors</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                      Fund the daily work.
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 sm:text-[15px]">
                      Cover meals, homework support, life skills sessions, and the quiet
                      costs that keep the centre open.
                    </p>
                  </div>
                  <ul className="mt-1 space-y-1.5 text-[12px] text-slate-600">
                    <li>
                      • Monthly giving for steady meal planning.
                    </li>
                    <li>
                      • Once-off gifts for specific needs.
                    </li>
                    <li>
                      • Group / family giving for special days.
                    </li>
                  </ul>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection("#donate")}
                    className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-[12px] font-medium text-white hover:bg-black"
                  >
                    View ways to give
                  </button>
                </div>
              </article>

              {/* Volunteers */}
              <article className="involve-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-5 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700">
                    <span className="text-xs" aria-hidden="true">
                      🤝
                    </span>
                    <span>Volunteers</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                      Offer your time.
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 sm:text-[15px]">
                      A few hours a month can mean a child gets help with reading,
                      homework, or simply has an adult who listens.
                    </p>
                  </div>
                  <ul className="mt-1 space-y-1.5 text-[12px] text-slate-600">
                    <li>
                      • Homework and reading support.
                    </li>
                    <li>
                      • Cooking and serving meals.
                    </li>
                    <li>
                      • Life skills and mentoring.
                    </li>
                  </ul>
                </div>
                <div className="pt-4">
                  <a
                    href={`https://wa.me/+27728631740?text=Hi`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-medium text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </article>

              {/* Partners */}
              <article className="involve-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-5 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                    <span className="text-xs" aria-hidden="true">
                      🌱
                    </span>
                    <span>Partners & corporates</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                      Build something longer term.
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 sm:text-[15px]">
                      Partner as a school, church, NGO, or business to support specific
                      programmes or co-create new ones.
                    </p>
                  </div>
                  <ul className="mt-1 space-y-1.5 text-[12px] text-slate-600">
                    <li>
                      • CSI initiatives and sponsorships.
                    </li>
                    <li>
                      • In-kind and skills-based support.
                    </li>
                    <li>
                      • Joint community events and campaigns.
                    </li>
                  </ul>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection("#contact")}
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-medium text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50"
                  >
                    Start a conversation
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Trust & legitimacy */}
        <section
          id="trust"
          className="section border-b border-slate-200 bg-[#F9FAF7]"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="max-w-3xl space-y-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Trust & legitimacy
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Registered, rooted, and accountable.
              </h2>
              <p className="text-sm text-slate-600 sm:text-[15px]">
                Trust is not an extra for us—it is the foundation. Inkosinami Drop-In Center has been present in the community for more than a decade, and registered as an NPO for over 8 years.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3 lg:gap-6">
              <article className="trust-card rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-600">
                  Registration
                </p>
                <h3 className="mt-2 text-sm font-medium text-slate-900 sm:text-[15px]">
                  Registered non-profit
                </h3>
                <p className="mt-2 text-sm text-slate-600 sm:text-[15px]">
                  South African non-profit organisation, operating for 10+ years and
                  registered as an NPO for over 8 years.
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  Formal registration details and documentation can be shared with
                  donors, partners, and auditors on request.
                </p>
              </article>

              <article className="trust-card rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-sky-600">
                  Community
                </p>
                <h3 className="mt-2 text-sm font-medium text-slate-900 sm:text-[15px]">
                  Known and trusted locally
                </h3>
                <p className="mt-2 text-sm text-slate-600 sm:text-[15px]">
                  Local schools, churches, neighbours, and caregivers in Embalenhle, Mpumalanga,
                  recognise Inkosinami as a steady support for children in the area.
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  References from principals, social workers, and community leaders are
                  available for due diligence.
                </p>
              </article>

              <article className="trust-card rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-amber-600">
                  Transparency
                </p>
                <h3 className="mt-2 text-sm font-medium text-slate-900 sm:text-[15px]">
                  Simple, careful use of funds
                </h3>
                <p className="mt-2 text-sm text-slate-600 sm:text-[15px]">
                  We keep things straightforward: food, learning, safe space, and
                  programme costs.
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  Bank confirmation letters and basic financial summaries can be shared,
                  with a public impact dashboard planned for a next phase.
                </p>
              </article>
            </div>
          </div>

          {/* Logo carousel */}
          <div className="relative mt-8 overflow-hidden border-t border-slate-200/60 bg-white/50 py-8">
            {/* Gradient fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#F9FAF7] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#F9FAF7] to-transparent" />
            
            <div className="logo-carousel flex">
              <div className="logo-track flex shrink-0 items-center gap-16">
                <img src="assets/absa.png" alt="Absa" className="h-10 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/debonairs.png" alt="Debonairs" className="h-5 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/shoprite.png" alt="Shoprite" className="h-6 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/sleepmaster.png" alt="Sleepmaster" className="h-5 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/multotech.png" alt="Multotech" className="h-15 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/letsatsi.png" alt="Letsatsi" className="h-10 opacity-40 grayscale transition-opacity hover:opacity-70" />
                {/*<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_logo.svg" alt="Tata" className="h-6 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/ABSA_Group_logo.svg" alt="Absa" className="h-5 opacity-40 grayscale transition-opacity hover:opacity-70" />*/}
              </div>
              <div className="logo-track flex shrink-0 items-center gap-16" aria-hidden="true">
                <img src="assets/absa.png" alt="Absa" className="h-10 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/debonairs.png" alt="Debonairs" className="h-5 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/shoprite.png" alt="Shoprite" className="h-6 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/sleepmaster.png" alt="Sleepmaster" className="h-5 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/multotech.png" alt="Multotech" className="h-15 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="assets/letsatsi.png" alt="Letsatsi" className="h-10 opacity-40 grayscale transition-opacity hover:opacity-70" />
                {/*<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_logo.svg" alt="" className="h-6 opacity-40 grayscale transition-opacity hover:opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/ABSA_Group_logo.svg" alt="" className="h-5 opacity-40 grayscale transition-opacity hover:opacity-70" />*/}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section
          id="donate"
          className="section border-b border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Gallery
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Inside Inkosinami, in six frames.
                </h2>
                <p className="max-w-md text-sm text-slate-600 sm:text-[15px]">
                  A quiet, documentary glimpse of meals, homework, play, and the small
                  in-between moments that make up a child's afternoon here.
                </p>
              </div>
              <p className="max-w-xs text-[12px] text-slate-500">
                Images are representative to protect children's privacy, but the
                feeling is true to the work.
              </p>
            </div>

            {/* Static filter chips (visual only) */}
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-slate-600">
              {[
                "All",
                "Meals",
                "Homework",
                "Life skills",
                "Play",
              ].map((label, index) => (
                <span
                  key={label}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1",
                    index === 0
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white/70"
                  )}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Shared meals */}
              <figure className="gallery-card group relative h-52 overflow-hidden rounded-3xl bg-slate-950 sm:h-60">
                <img
                  src="images/meal-sharing.jpg"
                  alt="Children visiting Spur"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">
                    Meals
                  </p>
                  <p className="mt-1 text-[12px] text-slate-50">
                    Shared meals, shared stories.
                  </p>
                </figcaption>
              </figure>

              {/* Homework table */}
              <figure className="gallery-card group relative h-52 overflow-hidden rounded-3xl bg-slate-100 sm:h-60">
                <img
                  src="images/books.jpeg"
                  alt="Homework support and reading corner"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">
                    Homework
                  </p>
                  <p className="mt-1 text-[12px] text-slate-50">
                    Homework finished before the sun goes down.
                  </p>
                </figcaption>
              </figure>

              {/* Life skills circle */}
              <figure className="gallery-card group relative h-52 overflow-hidden rounded-3xl bg-slate-50 sm:h-60">
                <img
                  src="images/outdoor-activities.jpeg"
                  alt="Children in a small life skills group"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">
                    Life skills
                  </p>
                  <p className="mt-1 text-[12px] text-slate-50">
                    Small circles, honest conversations.
                  </p>
                </figcaption>
              </figure>

              {/* Holiday programme */}
              <figure className="gallery-card group relative h-52 overflow-hidden rounded-3xl bg-white sm:h-60">
                <img
                  src="images/clothing-donations.jpeg"
                  alt="Children reading during a holiday programme"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">
                    Clothing
                  </p>
                  <p className="mt-1 text-[12px] text-slate-50">
                    Received piles of clothing donations for the kids.
                  </p>
                </figcaption>
              </figure>

              {/* Play and joy */}
              <figure className="gallery-card group relative h-52 overflow-hidden rounded-3xl bg-white sm:h-60">
                <img
                  src="images/playtime.jpg"
                  alt="Children laughing and playing together"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">
                    Play
                  </p>
                  <p className="mt-1 text-[12px] text-slate-50">
                    Joy that comes from feeling safe.
                  </p>
                </figcaption>
              </figure>

              {/* Quiet moment */}
              <figure className="gallery-card group relative h-52 overflow-hidden rounded-3xl bg-slate-50 sm:h-60">
                <img
                  src="images/quiet.jpeg"
                  alt="Child in a quiet moment of reflection"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">
                    Quiet
                  </p>
                  <p className="mt-1 text-[12px] text-slate-50">
                    A pause, a breath, a moment to feel held.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="section border-b border-slate-200 bg-[#F9FAF7]"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-4">
            {/* Header */}
            <div className="max-w-3xl space-y-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Contact
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Reach out to Inkosinami.
              </h2>
              <p className="text-sm text-slate-600 sm:text-[15px]">
                Send a note if you'd like to give, volunteer, partner, or simply
                understand the work more clearly. A real person will read and respond.
              </p>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,_1.3fr)_minmax(0,_1fr)] md:items-start">
              {/* Form card */}
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-5 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[12px] font-medium text-slate-800"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-0"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-[12px] font-medium text-slate-800"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-slate-800">
                      I'm reaching out about
                    </label>
                    <div className="mt-1.5 flex flex-wrap gap-2 text-[11px]">
                      {[
                        "Donations",
                        "Volunteering",
                        "Partnerships",
                        "Media / storytelling",
                        "Something else",
                      ].map((label) => (
                        <span
                          key={label}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Add any extra context (optional)"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-[12px] font-medium text-slate-800"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-0"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="rounded-full bg-slate-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
                    >
                      Send message
                    </button>
                    <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
              className="text-[12px] font-medium text-slate-900 underline-offset-4 hover:underline"
                    >
                      Or chat via WhatsApp
                    </a>
                    {contactSubmitted && (
                      <p className="text-[12px] text-slate-600">
                        Thank you. We'll be in touch soon.
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Details card */}
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/70 px-4 py-5 text-sm text-slate-600 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm sm:px-5 sm:py-6 sm:text-[15px]">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 sm:text-[15px]">
                    Details
                  </h3>
                  <p className="mt-2">
                    <span className="font-medium text-slate-900">Email:</span>{" "}
                    hello@inkosinami.org
                  </p>
                  <p className="mt-1">
                    <span className="font-medium text-slate-900">
                      Phone / WhatsApp:
                    </span>{" "}
                    +27 (0) 72 863 1740
                  </p>
                  <p className="mt-1">
                    <span className="font-medium text-slate-900">Location:</span>{" "}
                    Community-based centre in Embalenhle, Mpumalanga, South Africa. Exact
                    address shared on request for child safety.
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 text-[12px] text-slate-500">
                  <p>
                    We prioritise the dignity and privacy of children. Visits are
                    by appointment only and usually happen in the afternoons when
                    programmes are running.
                  </p>
                  <p className="mt-2">
                    If you prefer, you can request a quick call first. We'll
                    respond as soon as we're away from the children and able
                    to sit with your message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating actions: heart FAB that reveals Donate & WhatsApp */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {/* Expanded actions */}
        {isFabOpen && (
          <div className="mb-1 flex flex-col items-end gap-1 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                setIsDonateCardOpen(true);
                setIsFabOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-white"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-[13px]">❤</span>
              <span>Donate</span>
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-white"
              onClick={() => setIsFabOpen(false)}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[13px]">💬</span>
              <span>WhatsApp</span>
            </a>
          </div>
        )}

        {/* Heart FAB */}
        <button
          type="button"
          onClick={() => setIsFabOpen((open) => !open)}
          aria-label="Support Inkosinami"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg text-white shadow-lg ring-1 ring-black/10 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <span className="transition-transform duration-200">
            {isFabOpen ? "×" : "❤"}
          </span>
        </button>
      </div>

      <footer className="border-t border-slate-200 bg-white/90 py-6 text-[12px] text-slate-500">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} INkosinami Drop-In Center.
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("#trust")}
            className="text-[12px] text-slate-600 underline-offset-4 hover:underline text-center sm:text-right"
          >
            Legal & registration
          </button>
        </div>
      </footer>

      {isDonateCardOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsDonateCardOpen(false)}
          />

          <div className="relative w-full max-w-4xl rounded-[30px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-7 md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
              <div className="space-y-2 pr-4">
                <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-50">
                  Give to Inkosinami
                </span>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 sm:text-[17px]">
                  Ways to support the centre
                </h3>
                <p className="text-[12px] text-slate-500 sm:text-[13px]">
                  Choose the option that fits you best. We'll help with any details
                  once you reach out.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDonateCardOpen(false)}
                aria-label="Close donate options"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <span className="sr-only">Close</span>
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Financial giving */}
              <div className="space-y-3 text-sm text-slate-700 sm:text-[15px]">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Financial giving (EFT)
                </p>
                <p className="text-sm text-slate-600 sm:text-[15px]">
                  Use these details for once-off or monthly EFT. Please use your
                  name or organisation as the reference.
                </p>
                <dl className="mt-2 space-y-1.5 text-[13px] sm:text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Account name</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      INkosinami Drop-In Center
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Bank</dt>
                    <dd className="text-slate-800 text-right">To be confirmed</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Account number</dt>
                    <dd className="text-slate-800 text-right">
                      To be added once verified
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Branch code</dt>
                    <dd className="text-slate-800 text-right">To be added</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Reference</dt>
                    <dd className="text-slate-800 text-right">
                      Your Name / Organisation
                    </dd>
                  </div>
                </dl>
                <p className="pt-2 text-[12px] text-slate-500">
                  Email proof of payment to
                  {" "}
                  <span className="font-medium">finance@inkosinami.org</span>
                  {" "}
                  if you'd like a receipt or banking confirmation letter.
                </p>
              </div>

              {/* In-kind giving */}
              <div className="space-y-3 text-sm text-slate-700 sm:text-[15px] md:border-l md:border-slate-200 md:pl-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  In-kind support
                </p>
                <p className="text-sm text-slate-600 sm:text-[15px]">
                  Donate groceries, cooked food, clothing, books, or other items by
                  arranging a safe drop-off at the centre.
                </p>
                <div className="mt-2 space-y-1.5 text-[13px] sm:text-sm">
                  <p>
                    <span className="font-medium text-slate-900">Area:</span>{" "}
                    Embalenhle, Mpumalanga, South Africa.
                  </p>
                  <p>
                    <span className="font-medium text-slate-900">Approximate location:</span>{" "}
                    Near local primary and secondary schools in Embalenhle.
                  </p>
                  <p className="text-[12px] text-slate-500">
                    Exact address is shared once we've connected, to protect
                    children's privacy. We can also coordinate collection for
                    larger items where possible.
                  </p>
                </div>
                <div className="pt-1 text-[12px] text-slate-500">
                  <p>
                    To arrange a drop-off, please email
                    {" "}
                    <span className="font-medium">hello@inkosinami.org</span>
                    {" "}
                    or message us on WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}