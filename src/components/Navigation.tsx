import { useState, useEffect } from 'react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'impact', label: 'Impact' },
    { id: 'story', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-panel border-b border-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-hope-blue to-blue-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-3.5 h-3.5 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span
                className={`text-sm font-semibold tracking-tight transition-colors ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                }`}
                style={{ fontFamily: 'SF Pro Display, Poppins, sans-serif' }}
              >
                INkosinam
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    currentSection === item.id
                      ? isScrolled
                        ? 'bg-charcoal/5 text-charcoal'
                        : 'bg-white/15 text-white'
                      : isScrolled
                      ? 'text-gray-text hover:text-charcoal hover:bg-charcoal/5'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('donate')}
                className={`hidden md:block px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'bg-hope-blue text-white hover:bg-blue-600'
                    : 'bg-white text-charcoal hover:bg-white/90'
                }`}
              >
                Donate
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                <span className={`w-4 h-[1.5px] bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`w-4 h-[1.5px] bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute inset-x-4 top-20 bg-white rounded-2xl shadow-2xl p-6">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentSection === item.id
                    ? 'bg-hope-blue/10 text-hope-blue'
                    : 'text-charcoal hover:bg-gray-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-light">
            <button
              onClick={() => {
                onNavigate('donate');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-hope-blue text-white text-base font-medium rounded-xl"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
