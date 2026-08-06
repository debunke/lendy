import type { Item } from '@/types';
import { Search, MapPin, Clock, Home, ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  items: Item[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onBrowse: () => void;
  onSelect: (item: Item) => void;
}

export default function HomePage({ items, searchQuery, onSearchChange, onBrowse, onSelect }: HomePageProps) {
  const featured = items.slice(0, 3);

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <section className="bg-gradient-to-br from-sky-100 via-stone-50 to-emerald-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 rounded-full px-4 py-1.5 text-sm font-medium text-sky-700 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Your neighborhood sharing app
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 leading-tight">
            Borrow what you need.<br />Lend what you don't.
          </h1>
          <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Lendly connects you with neighbors so you can borrow tools, gear, and even a
            spare guest room — no need to buy what you'll only use once.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto bg-white rounded-2xl p-2 shadow-md">
            <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0 hidden sm:block" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for a drill, tent, guest room…"
              className="flex-1 w-full px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none text-base rounded-xl sm:rounded-none"
            />
            <button
              onClick={onBrowse}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Feature icon={<Search className="w-5 h-5" />} title="Find it fast" desc="Search by item or category" />
            <Feature icon={<MapPin className="w-5 h-5" />} title="See the route" desc="Map and photo to the door" />
            <Feature icon={<Clock className="w-5 h-5" />} title="Borrow by the day" desc="Set how long you need it" />
          </div>

          <div className="mt-8 inline-flex items-center gap-2 bg-white/60 rounded-full px-4 py-2 text-sm text-stone-600">
            <Home className="w-4 h-4 text-emerald-600" />
            Lendly isn't just for things — you can lend a guest room too.
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-800">Recently listed</h2>
            <button
              onClick={onBrowse}
              className="inline-flex items-center gap-1 text-sky-600 font-semibold hover:text-sky-700"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg hover:border-sky-300 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-3 left-3 text-sm font-bold px-3 py-1 rounded-full ${
                      item.listing_type === 'borrow'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {item.listing_type === 'borrow' ? 'Borrow' : `Rent $${item.price}`}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-stone-800 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm text-stone-500">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    {item.house_number} {item.street}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
      <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center mb-2 text-sky-600">
        {icon}
      </div>
      <p className="font-semibold text-stone-800">{title}</p>
      <p className="text-stone-500 text-sm">{desc}</p>
    </div>
  );
}
