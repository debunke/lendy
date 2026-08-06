import { useState } from 'react';
import type { ItemDraft, ListingType } from '@/types';
import { X, Loader2 } from 'lucide-react';

interface AddListingModalProps {
  onClose: () => void;
  onSubmit: (draft: ItemDraft) => Promise<void>;
}

const CATEGORIES = ['Tools', 'Outdoor', 'Kitchen', 'Sports', 'Games', 'Rooms', 'Electronics', 'Other'];

export default function AddListingModal({ onClose, onSubmit }: AddListingModalProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Tools',
    listing_type: 'borrow' as ListingType,
    image_url: '',
    price: '',
    borrow_duration: '',
    owner_name: '',
    house_number: '',
    street: '',
    city: '',
    latitude: '',
    longitude: '',
    house_image_url: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);
    if (isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid numbers for the map location.');
      return;
    }

    const draft: ItemDraft = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      listing_type: form.listing_type,
      image_url: form.image_url.trim(),
      price: form.listing_type === 'rent' ? parseFloat(form.price) || 0 : 0,
      borrow_duration: form.listing_type === 'borrow' ? form.borrow_duration.trim() || null : null,
      owner_name: form.owner_name.trim(),
      house_number: form.house_number.trim(),
      street: form.street.trim(),
      city: form.city.trim(),
      latitude: lat,
      longitude: lng,
      house_image_url: form.house_image_url.trim(),
    };

    if (!draft.title || !draft.description || !draft.image_url || !draft.owner_name ||
        !draft.house_number || !draft.street || !draft.city || !draft.house_image_url) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(draft);
    } catch {
      setError('Something went wrong saving your listing. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 animate-[fadeIn_0.2s_ease]">
        <div className="flex items-center justify-between p-6 border-b border-stone-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-stone-800">List an item</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 text-base rounded-lg p-3 border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Item name">
              <input type="text" required value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Cordless drill" className={inputClass} />
            </Field>
            <Field label="Category">
              <select value={form.category}
                onChange={(e) => update('category', e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea required rows={3} value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Describe the item, its condition, and what it's good for."
              className={inputClass} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Listing type">
              <div className="flex gap-2">
                <TypeButton active={form.listing_type === 'borrow'} onClick={() => update('listing_type', 'borrow')}>
                  Borrow (free)
                </TypeButton>
                <TypeButton active={form.listing_type === 'rent'} onClick={() => update('listing_type', 'rent')}>
                  Rent (paid)
                </TypeButton>
              </div>
            </Field>
            {form.listing_type === 'borrow' ? (
              <Field label="Borrow period">
                <input type="text" value={form.borrow_duration}
                  onChange={(e) => update('borrow_duration', e.target.value)}
                  placeholder="e.g. 3 days" className={inputClass} />
              </Field>
            ) : (
              <Field label="Price ($)">
                <input type="number" min="0" step="0.01" value={form.price}
                  onChange={(e) => update('price', e.target.value)}
                  placeholder="e.g. 15" className={inputClass} />
              </Field>
            )}
          </div>

          <Field label="Photo of the item (URL)">
            <input type="url" required value={form.image_url}
              onChange={(e) => update('image_url', e.target.value)}
              placeholder="https://…" className={inputClass} />
          </Field>

          <div className="pt-2 border-t border-stone-100">
            <p className="font-semibold text-stone-700 mb-3 text-lg">Your details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Your name">
                <input type="text" required value={form.owner_name}
                  onChange={(e) => update('owner_name', e.target.value)}
                  placeholder="e.g. Jane Doe" className={inputClass} />
              </Field>
              <Field label="House number">
                <input type="text" required value={form.house_number}
                  onChange={(e) => update('house_number', e.target.value)}
                  placeholder="e.g. 42" className={inputClass} />
              </Field>
              <Field label="Street">
                <input type="text" required value={form.street}
                  onChange={(e) => update('street', e.target.value)}
                  placeholder="e.g. Maple Avenue" className={inputClass} />
              </Field>
              <Field label="City">
                <input type="text" required value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  placeholder="e.g. Springfield" className={inputClass} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Field label="Map latitude">
                <input type="text" required value={form.latitude}
                  onChange={(e) => update('latitude', e.target.value)}
                  placeholder="e.g. 39.7817" className={inputClass} />
              </Field>
              <Field label="Map longitude">
                <input type="text" required value={form.longitude}
                  onChange={(e) => update('longitude', e.target.value)}
                  placeholder="e.g. -89.6444" className={inputClass} />
              </Field>
            </div>
            <p className="text-sm text-stone-400 mt-2">
              Tip: find your latitude and longitude by right-clicking your house on Google Maps.
            </p>
          </div>

          <Field label="Photo of your house (URL)">
            <input type="url" required value={form.house_image_url}
              onChange={(e) => update('house_image_url', e.target.value)}
              placeholder="https://…" className={inputClass} />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-5 py-3.5 rounded-xl font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors text-base">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white bg-sky-500 hover:bg-sky-600 disabled:opacity-60 transition-colors text-base">
              {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {submitting ? 'Posting…' : 'Post listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all text-stone-800 placeholder-stone-400 text-base';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-600 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function TypeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex-1 px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
        active ? 'bg-sky-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
      }`}>
      {children}
    </button>
  );
}
