/*
# Create Lendly schema (single-tenant, no auth)

1. New Tables
- `items`
  - `id` (uuid, primary key)
  - `title` (text, not null) - name of the item or space
  - `description` (text, not null) - details about the item
  - `category` (text, not null) - e.g. tools, sports, rooms, kitchen, etc.
  - `listing_type` (text, not null) - 'borrow' or 'rent'
  - `image_url` (text, not null) - photo of the item
  - `price` (numeric, default 0) - price for rent listings (0 for free borrow)
  - `borrow_duration` (text) - time frame for borrow listings (e.g. "3 days")
  - `owner_name` (text, not null) - name of the lender
  - `house_number` (text, not null) - street number of the house
  - `street` (text, not null) - street name
  - `city` (text, not null) - city
  - `latitude` (double precision, not null) - house location lat
  - `longitude` (double precision, not null) - house location lng
  - `house_image_url` (text, not null) - photo of what the house looks like
  - `available` (boolean, default true) - whether currently available
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `items`.
- Allow anon + authenticated CRUD because the app is intentionally public/shared (no sign-in).
*/

CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  listing_type text NOT NULL CHECK (listing_type IN ('borrow', 'rent')),
  image_url text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  borrow_duration text,
  owner_name text NOT NULL,
  house_number text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  house_image_url text NOT NULL,
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_items" ON items;
CREATE POLICY "anon_select_items" ON items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_items" ON items;
CREATE POLICY "anon_insert_items" ON items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_items" ON items;
CREATE POLICY "anon_update_items" ON items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_items" ON items;
CREATE POLICY "anon_delete_items" ON items FOR DELETE
  TO anon, authenticated USING (true);
