/*
  # Update listings and profiles relationship

  1. Changes
    - Ensures proper relationship between listings and profiles tables
    - Adds explicit foreign key constraint if not already present
  
  2. Security
    - Maintains existing RLS policies
*/

-- Check if the foreign key constraint exists and add it if not
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'listings_supplier_id_fkey' 
    AND table_name = 'listings'
  ) THEN
    ALTER TABLE listings 
    ADD CONSTRAINT listings_supplier_id_fkey 
    FOREIGN KEY (supplier_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;