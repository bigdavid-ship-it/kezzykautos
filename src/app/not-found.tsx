import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Kezzyk Autos',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex-1 min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-surface to-bg-primary z-0" />
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-[8rem] md:text-[12rem] font-bold text-text-primary leading-none tracking-tighter drop-shadow-glow-strong">
            4<span className="text-accent">0</span>4
          </h1>
          <h2 className="text-display-sm font-semibold text-text-primary">
            Page Not Found
          </h2>
          <p className="text-body-lg text-text-secondary max-w-md mx-auto">
            The road ends here. We can't seem to find the page you're looking for. It might have been moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/" className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-button bg-accent text-white hover:bg-accent-hover active:bg-accent-dark shadow-md hover:shadow-glow text-body-lg px-7 py-3.5 gap-2.5 w-full sm:w-auto min-w-[200px]">
            <Home className="mr-2 w-5 h-5" /> Back to Home
          </Link>
          <Link href="/inventory" className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-button border border-accent text-accent hover:bg-accent hover:text-white text-body-lg px-7 py-3.5 gap-2.5 w-full sm:w-auto min-w-[200px]">
            <Search className="mr-2 w-5 h-5" /> Browse Inventory
          </Link>
        </div>
      </div>
    </main>
  );
}
