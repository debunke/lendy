import { Handshake } from 'lucide-react';
import type { Page } from '@/App';

interface NavbarProps {
  page: string;
  onNavigate: (page: Page) => void;
}

const LINKS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'browse', label: 'Browse' },
  { id: 'list', label: 'List an Item' },
];

export default function Navbar({ page, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-stone-800 hidden sm:inline">Lendly</span>
          </button>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all ${
                  page === link.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
