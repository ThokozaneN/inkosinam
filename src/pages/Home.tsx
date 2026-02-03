import { Hero } from '@/components/Hero';
import { ImpactStats } from '@/components/ImpactStats';
import { Programs } from '@/components/Programs';
import { Storytelling } from '@/components/Storytelling';
import { Founder } from '@/components/Founder';
import { CallToAction } from '@/components/CallToAction';
import { Gallery } from '@/components/Gallery';

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImpactStats />
      <Storytelling />
      <Programs />
      <Gallery />
      <Founder />
      <CallToAction />
    </div>
  );
}
