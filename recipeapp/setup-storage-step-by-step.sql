-- Step-by-Step Storage Setup
-- Run each section separately in Supabase SQL Editor

-- ===========================================
-- STEP 1: Create the storage bucket
-- ===========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true);

-- ===========================================
-- STEP 2: Create public read policy
-- ===========================================
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'recipe-images');

-- ===========================================
-- STEP 3: Create upload policy for authenticated users
-- ===========================================
CREATE POLICY "Authenticated users can upload recipe images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- ===========================================
-- STEP 4: Verify everything is working
-- ===========================================
SELECT * FROM storage.buckets WHERE id = 'recipe-images';
