import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Item } from '@/types';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import BrowsePage from '@/components/BrowsePage';
import ListingDetail from '@/components/ListingDetail';
import AddListingModal from '@/components/AddListingModal';

export type Page = 'home' | 'browse' | 'list';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<Page>('home');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError('We could not load the listings. Please try again in a moment.');
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  }

  async function handleAddListing(draft: Omit<Item, 'id' | 'created_at' | 'available'>) {
    const { data, error } = await supabase
      .from('items')
      .insert({ ...draft, available: true })
      .select()
      .single();
    if (error) throw error;
    setItems((prev) => [data, ...prev]);
    setShowAddModal(false);
    setPage('browse');
  }

  function navigate(p: Page) {
    setSelectedItem(null);
    if (p === 'list') {
      setShowAddModal(true);
    } else {
      setPage(p);
    }
  }

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar page={selectedItem ? 'browse' : page} onNavigate={navigate} />

      <main className="flex-1 pt-16">
        {selectedItem ? (
          <ListingDetail item={selectedItem} onBack={() => setSelectedItem(null)} />
        ) : page === 'home' ? (
          <HomePage
            items={items}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBrowse={() => setPage('browse')}
            onSelect={setSelectedItem}
          />
        ) : (
          <BrowsePage
            items={filtered}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onSelect={setSelectedItem}
            onRetry={fetchItems}
          />
        )}
      </main>

      {showAddModal && (
        <AddListingModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddListing}
        />
      )}

      <footer className="bg-stone-800 text-stone-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center text-sm">
          Lendly — borrow, lend, and share with your neighbors.
        </div>
      </footer>
    </div>
  );
}
