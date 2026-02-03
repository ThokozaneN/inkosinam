import { FormEvent, useState } from 'react';
import { Heart, ArrowRight, MessageCircle } from 'lucide-react';

const presetAmounts = [50, 100, 250, 500];

export function Donate() {
  const [amount, setAmount] = useState<number | ''>('');
  const [custom, setCustom] = useState<string>('');

  const handlePresetClick = (value: number) => {
    setAmount(value);
    setCustom('');
  };

  const handleCustomChange = (value: string) => {
    setCustom(value);
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      setAmount(parsed);
    } else {
      setAmount('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // For now we just prevent default – ready for future integration
  };

  return (
    <div className="bg-soft-cream pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 space-y-12">
        {/* Hero section */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-center">
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500">
              Donate to INkosinami
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              Your generosity keeps
              <span className="block text-hope-blue">the doors open.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Every rand you give helps a child in Embalenhle, Mpumalanga access meals,
              homework support, life skills, and a safe community at INkosinami Community Center.
            </p>

            <div className="flex flex-wrap gap-3 pt-1 text-xs md:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-gray-700 border border-gray-200">
                <Heart className="h-3.5 w-3.5 text-warm-orange" />
                R50 ≈ 5 meals
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-gray-700 border border-gray-200">
                <Heart className="h-3.5 w-3.5 text-hope-blue" />
                R100 ≈ school supplies
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-gray-700 border border-gray-200">
                <Heart className="h-3.5 w-3.5 text-warm-orange" />
                R500 ≈ life skills workshop
              </span>
            </div>
          </div>

          <div className="relative max-w-xl lg:ml-auto">
            <div className="absolute -top-10 -right-10 h-52 w-52 rounded-3xl bg-hope-blue/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-3xl bg-warm-orange/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 md:p-7 shadow-xl border border-white/10 space-y-4">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-hope-blue/30 blur-3xl" />
              <div className="absolute -bottom-16 -left-20 h-40 w-40 rounded-full bg-warm-orange/25 blur-3xl" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                  <Heart className="h-3.5 w-3.5 text-warm-orange" />
                  Why your giving matters
                </div>
                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                  Some children go to bed hungry. Others go to bed hopeful — because someone
                  like you chose to give. Your gift keeps this lifeline strong in Embalenhle.
                </p>
                <p className="text-xs text-white/75">
                  INkosinami Community Center is a registered NPO. Your support helps us remain
                  consistent, accountable, and present for the children we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main donation layout */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
          {/* Donation form */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
                Choose how you&apos;d like to give.
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Select a suggested amount or enter your own. You can use these guides to
                understand what your gift can make possible.
              </p>
            </div>

            {/* Preset amounts */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-600">Suggested once-off gifts (ZAR)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handlePresetClick(value)}
                    className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold text-center transition-colors ${
                      amount === value
                        ? 'bg-hope-blue text-white border-hope-blue hover:bg-blue-600'
                        : 'bg-white text-primary border-gray-200 hover:border-hope-blue/60'
                    }`}
                  >
                    R{value}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-gray-500 space-y-1">
                <p>R50 ≈ 5 meals · R100 ≈ school stationery · R250+ ≈ support for a month.</p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
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
                  <label className="text-xs font-medium text-gray-600">Amount (ZAR)</label>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={custom}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60"
                    placeholder={amount ? amount.toString() : 'e.g. 250'}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Note (optional)</label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-hope-blue/60 focus:border-hope-blue/60 resize-none"
                  placeholder="If you&apos;d like to support a specific program, add it here (e.g. meals, homework, life skills)."
                />
              </div>

              <p className="text-[11px] text-gray-500">
                This form helps us keep a record of your pledge. To complete your donation, please
                make an EFT using the banking details on this page and include your name as the
                payment reference.
              </p>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-hope-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
              >
                <Heart className="h-4 w-4 fill-white" />
                I&apos;ll give via EFT
              </button>
            </form>
          </div>

          {/* Banking details / WhatsApp */}
          <div className="space-y-4">
            <div className="rounded-3xl bg-primary text-white p-6 md:p-7 relative overflow-hidden shadow-sm border border-white/10">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-hope-blue/40 blur-2xl" />
              <div className="absolute -bottom-12 -left-14 h-32 w-32 rounded-full bg-warm-orange/30 blur-2xl" />

              <div className="relative space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-white/70">
                    Bank transfer details
                  </p>
                  <h2 className="text-sm md:text-base font-semibold">INkosinami Community Center</h2>
                </div>

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
                    <span className="font-medium text-right">Your Name + Purpose (e.g. Meals)</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-black/20 border border-white/10 px-3 py-2.5 text-[11px] text-white/85">
                  <p className="font-medium mb-1">WhatsApp proof of payment</p>
                  <p>
                    Send your POP to <span className="font-semibold">+27 00 000 0000</span> so we can
                    allocate your gift correctly and thank you personally.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-gray-100 p-5 md:p-6 shadow-sm space-y-3">
              <p className="text-sm font-semibold text-primary flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-500" />
                Prefer a quick WhatsApp?
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Send us a message if you&apos;d like help setting up a monthly debit order, corporate
                sponsorship, or in-kind donation.
              </p>
              <a
                href="https://wa.me/27123456789"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-hope-blue px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp the team
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
