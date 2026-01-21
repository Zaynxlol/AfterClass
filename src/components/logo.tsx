import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary rounded-md p-1.5">
        <GraduationCap className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-headline text-xl font-bold">AfterClass</span>
    </div>
  );
}
