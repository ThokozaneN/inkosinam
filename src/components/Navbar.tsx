import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className={cn(
          'transition-all duration-500 ease-in-out pointer-events-auto',
          scrolled || !isHome
            ? 'mt-4 w-[90%] md:w-auto md:min-w-[700px] bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/20 py-3 px-6'
            : 'w-full bg-transparent py-6'
        )}
      >
        <div className={cn(
          "flex items-center justify-between",
          scrolled || !isHome ? "w-full" : "container mx-auto px-6"
        )}>
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-2 text-2xl font-bold tracking-tighter transition-colors duration-300",
              scrolled || !isHome ? "text-primary" : "text-white"
            )}
          >
            {/* Logo icon - simple heart */}
            <span
              className={cn(
                "flex items-center justify-center rounded-full border transition-all duration-300",
                scrolled || !isHome
                  ? "h-10 w-10 border-hope-blue/40 bg-white"
                  : "h-8 w-8 border-white/40 bg-white/10"
              )}
            >
              <Heart
                className={cn(
                  "transition-all duration-300",
                  scrolled || !isHome ? "h-5 w-5 text-hope-blue fill-hope-blue/20" : "h-4 w-4 text-white fill-white/20"
                )}
              />
            </span>
            <span
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap",
                scrolled || !isHome ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
              )}
            >
              INkosinami
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-hope-blue",
                  scrolled || !isHome ? "text-charcoal" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="group flex items-center gap-2 px-5 py-2.5 bg-hope-blue text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              <Heart size={16} className="fill-white group-hover:scale-110 transition-transform" />
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={scrolled || !isHome ? "text-charcoal" : "text-white"} />
            ) : (
              <Menu className={scrolled || !isHome ? "text-charcoal" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className={cn(
            "absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 p-6 shadow-xl md:hidden flex flex-col space-y-4",
            scrolled || !isHome ? "rounded-2xl w-full" : "w-screen -ml-6"
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-charcoal"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-hope-blue text-white rounded-lg text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={18} className="fill-white" />
              Donate Now
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
