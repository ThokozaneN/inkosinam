import { cn } from '@/utils/cn';

type LogoMarkProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export function LogoMark({ variant = 'dark', className }: LogoMarkProps) {
  const isLight = variant === 'light';

  const outerFill = isLight ? 'rgba(249, 250, 247, 0.10)' : '#0B1F3A';
  const outerStroke = isLight ? '#F9FAF7' : '#3B82F6';

  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="12"
        fill={outerFill}
        stroke={outerStroke}
        strokeWidth="2"
      />
      {/* Care circle - community */}
      <circle cx="14" cy="16" r="3" fill="#3B82F6" />
      {/* Warmth circle - hope */}
      <circle cx="24" cy="16" r="3" fill="#F59E0B" />
      {/* Heart-shaped foundation */}
      <path
        d="M12 19C12 16.8 13.8 15 16 15C17.3 15 18.5 15.6 19.2 16.6C19.9 15.6 21.1 15 22.4 15C24.6 15 26.4 16.8 26.4 19C26.4 21.4 24.9 23.4 22.9 24.9L19.2 27.6L15.5 24.9C13.5 23.4 12 21.4 12 19Z"
        fill={isLight ? '#F9FAF7' : '#F9FAF7'}
      />
    </svg>
  );
}
