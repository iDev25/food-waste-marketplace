/*
  # Create listings table

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `supplier_id` (uuid, foreign key to profiles)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `price` (numeric)
      - `quantity` (integer)
      - `quantity_unit` (text)
      - `location` (text)
      - `pickup_delivery` (text)
      - `expiry_date` (date)
      - `images` (text array)
      - `dietary_info` (text array)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `listings` table
    - Add policy for anyone to read available listings
    - Add policy for authenticated users to create listings
    - Add policy for authenticated users to update their own listings
*/

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  price numeric NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  quantity_unit text,
  location text,
  pickup_delivery text,
  expiry_date date,
  images text[],
  dietary_info text[],
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read available listings"
  ON listings
  FOR SELECT
  USING (status = 'available' OR status IS NULL);

CREATE POLICY "Authenticated users can create listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = supplier_id);

CREATE POLICY "Users can update their own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = supplier_id);

CREATE POLICY "Users can delete their own listings"
  ON listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = supplier_id);
