-- Simple Storage Setup for Recipe Images
-- Run this in Supabase SQL Editor

-- Step 1: Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create policy for public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'recipe-images');

-- Step 3: Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload recipe images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- Step 4: Verify bucket was created
SELECT * FROM storage.buckets WHERE id = 'recipe-images';
