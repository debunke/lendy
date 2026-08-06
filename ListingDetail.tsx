import type { Item } from '@/types';
import {
  ArrowLeft, MapPin, Clock, Tag, User, Home, Navigation, CheckCircle2,
} from 'lucide-react';

interface ListingDetailProps {
  item: Item;
  onBack: () => void;
}

export default function ListingDetail({ item, onBack }: ListingDetailProps) {
  const delta = 0.005;
  const bbox = `${item.longitude - delta}%2C${item.latitude - delta}%2C${item.longitude + delta}%2C${item.latitude + delta}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${item.latitude}%2C${item.longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-[fadeIn_0.25s_ease]">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-stone-600 hover:text-sky-600 font-medium mb-6 text-base"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] shadow-sm">
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            <span
              className={`absolute top-4 left-4 text-sm font-bold px-4 py-1.5 rounded-full ${
                item.listing_type === 'borrow'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-500 text-white'
              }`}
            >
              {item.listing_type === 'borrow' ? 'Available to borrow' : `Rent $${item.price}`}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-stone-400 mb-2">
              <Tag className="w-4 h-4" />
              {item.category}
            </div>
            <h1 className="text-3xl font-bold text-stone-800">{item.title}</h1>
            <p className="mt-3 text-stone-600 leading-relaxed text-lg">{item.description}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={<User className="w-5 h-5" />} label="Lender" value={item.owner_name} />
              {item.listing_type === 'borrow' && item.borrow_duration && (
                <InfoCard icon={<Clock className="w-5 h-5" />} label="Borrow period" value={item.borrow_duration} />
              )}
              {item.listing_type === 'rent' && (
                <InfoCard icon={<Tag className="w-5 h-5" />} label="Price" value={`$${item.price}`} />
              )}
              <InfoCard
                icon={<MapPin className="w-5 h-5" />}
                label="Address"
                value={`${item.house_number} ${item.street}, ${item.city}`}
              />
            </div>

            <div className="mt-6 flex items-center gap-2 text-base font-medium">
              <CheckCircle2 className={`w-5 h-5 ${item.available ? 'text-emerald-600' : 'text-stone-400'}`} />
              <span className={item.available ? 'text-emerald-700' : 'text-stone-500'}>
                {item.available ? 'Available now' : 'Currently unavailable'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-sky-500" />
            How to get there
          </h2>
          <p className="text-stone-500 mb-4 text-base leading-relaxed">
            Here's the route to {item.owner_name}'s place. Tap "Get directions" to open turn-by-turn directions on your phone.
          </p>

          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <iframe
              title="Map to location"
              src={mapSrc}
              className="w-full h-72 border-0"
              loading="lazy"
            />
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors text-base"
          >
            <Navigation className="w-5 h-5" />
            Get directions
          </a>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-500" />
              What the house looks like
            </h3>
            <p className="text-stone-500 mb-4 text-base leading-relaxed">
              Look for this house when you arrive so you know you're at the right door.
            </p>
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
              <img
                src={item.house_image_url}
                alt={`The house at ${item.house_number} ${item.street}`}
                className="w-full h-64 object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-stone-500">
              {item.house_number} {item.street}, {item.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
      <div className="flex items-center gap-2 text-stone-400 text-sm mb-1">
        {icon}
        {label}
      </div>
      <p className="font-semibold text-stone-800 text-base">{value}</p>
    </div>
  );
}
