import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const amounts = [
    { value: 50, label: '5 meals', icon: '🍲' },
    { value: 100, label: 'School supplies', icon: '📚' },
    { value: 250, label: 'Monthly support', icon: '💝' },
    { value: 500, label: 'Life skills workshop', icon: '🌟' },
    { value: 1000, label: 'Sponsor a child', icon: '👦' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading parallax reveal
      gsap.fromTo(headingRef.current,
        { 
          opacity: 0, 
          y: 80,
          filter: 'blur(15px)'
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

      // Content reveal from left
      gsap.fromTo(contentRef.current,
        { 
          opacity: 0, 
          x: -100,
          rotateY: 15
        },
        { 
          opacity: 1, 
          x: 0,
          rotateY: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

      // Card reveal from right
      gsap.fromTo(cardRef.current,
        { 
          opacity: 0, 
          x: 100,
          rotateY: -15
        },
        { 
          opacity: 1, 
          x: 0,
          rotateY: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

      // Amount buttons stagger
      const amountBtns = cardRef.current?.querySelectorAll('.amount-btn');
      if (amountBtns) {
        gsap.fromTo(amountBtns,
          { 
            opacity: 0, 
            scale: 0.8,
            y: 20
          },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getImpactMessage = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount;
    if (amount >= 1000) return 'You could sponsor a child for a month';
    if (amount >= 500) return 'You could fund a life skills workshop';
    if (amount >= 250) return 'You could provide monthly support';
    if (amount >= 100) return 'You could provide school supplies';
    if (amount >= 50) return 'You could provide 5 nutritious meals';
    return 'Every contribution makes a difference';
  };

  return (
    <section 
      ref={sectionRef}
      id="donate" 
      className="relative py-32 md:py-48 bg-white overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-6">
            Make a Difference
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Your gift creates
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              lasting change
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            100% of your donation goes directly to supporting vulnerable children in our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Impact Info */}
          <div ref={contentRef}>
            <div className="space-y-8">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Every Rand Counts</h3>
                    <p className="text-gray-600">Your donation directly impacts children's lives</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'R50', desc: '5 Meals' },
                    { value: 'R100', desc: 'Supplies' },
                    { value: 'R500', desc: 'Workshop' },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                      <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Details */}
              <div className="p-8 rounded-3xl bg-gray-900 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Bank Transfer Details
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span>Bank</span>
                    <span className="font-medium text-white">First National Bank</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span>Account Name</span>
                    <span className="font-medium text-white">INkosinam NPO</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span>Account Number</span>
                    <span className="font-medium text-white">62123456789</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Branch Code</span>
                    <span className="font-medium text-white">250655</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Donation Card */}
          <div 
            ref={cardRef}
            className="relative p-8 md:p-10 rounded-3xl bg-white border border-gray-200 shadow-2xl"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" />

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose an amount</h3>
            <p className="text-gray-600 mb-8">Select a donation tier or enter a custom amount</p>

            {/* Amount buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {amounts.map((amount) => (
                <button
                  key={amount.value}
                  onClick={() => {
                    setSelectedAmount(amount.value);
                    setCustomAmount('');
                  }}
                  className={`amount-btn group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedAmount === amount.value && !customAmount
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-2xl mb-1 block group-hover:scale-110 transition-transform">{amount.icon}</span>
                  <span className="text-xl font-bold text-gray-900">R{amount.value}</span>
                  <span className="text-xs text-gray-500 block">{amount.label}</span>
                  {selectedAmount === amount.value && !customAmount && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}

              {/* Custom amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R</span>
                <input
                  type="number"
                  placeholder="Custom"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full h-full pl-8 pr-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors text-xl font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Impact preview */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium">{getImpactMessage()}</p>
                  <p className="text-green-600 text-sm">with R{customAmount || selectedAmount}</p>
                </div>
              </div>
            </div>

            {/* Donate button */}
            <button className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mb-4">
              Donate R{customAmount || selectedAmount}
            </button>

            {/* WhatsApp option */}
            <button className="w-full py-4 px-8 rounded-2xl bg-green-500 text-white font-semibold flex items-center justify-center gap-3 hover:bg-green-600 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Donate via WhatsApp
            </button>

            {/* Trust badges */}
            <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Verified NPO</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Tax Deductible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
