import type { Item } from '@/types';
import { Search, MapPin, Clock, Tag, Loader2, X } from 'lucide-react';

interface BrowsePageProps {
  items: Item[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  onSelect: (item: Item) => void;
  onRetry: () => void;
}

export default function BrowsePage({
  items, loading, error, searchQuery, onSearchChange,
  categories, activeCategory, onCategoryChange, onSelect, onRetry,
}: BrowsePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-[fadeIn_0.25s_ease]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Browse the neighborhood</h1>
          <p className="text-stone-500 mt-1 text-lg">
            {items.length} {items.length === 1 ? 'listing' : 'listings'} available near you
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm border border-stone-200 w-full sm:w-72">
          <Search className="w-5 h-5 text-stone-400 ml-1 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items…"
            className="flex-1 px-2 py-2 text-stone-800 placeholder-stone-400 focus:outline-none text-base"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-base font-medium transition-all ${
              activeCategory === cat
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-sky-300 hover:text-sky-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-stone-400">
          <Loader2 className="w-10 h-10 text-sky-400 animate-spin mb-4" />
          <p className="text-lg">Loading listings…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <X className="w-10 h-10 text-red-400 mb-3" />
          <p className="text-stone-600 text-lg">{error}</p>
          <button onClick={onRetry} className="mt-4 text-sky-600 font-semibold hover:text-sky-700">
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-stone-500 text-lg">No listings match your search.</p>
          <button
            onClick={() => { onSearchChange(''); onCategoryChange('All'); }}
            className="mt-4 text-sky-600 font-semibold hover:text-sky-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
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
                {!item.available && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-stone-800 text-white">
                    Unavailable
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-stone-400 mb-1">
                  <Tag className="w-3.5 h-3.5" />
                  {item.category}
                </div>
                <h3 className="font-bold text-lg text-stone-800 group-hover:text-sky-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1 text-stone-500">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    {item.house_number} {item.street}
                  </span>
                  {item.listing_type === 'borrow' && item.borrow_duration && (
                    <span className="inline-flex items-center gap-1 text-stone-500">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      {item.borrow_duration}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
