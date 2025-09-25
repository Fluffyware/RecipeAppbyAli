-- Setup Storage Bucket for Recipe Images
-- Run this script in your Supabase SQL Editor

-- 1. Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'recipe-images', 
  'recipe-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Create policy for public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'recipe-images');

-- 3. Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload recipe images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- 4. Create policy for users to update their own images
CREATE POLICY "Users can update their own recipe images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- 5. Create policy for users to delete their own images
CREATE POLICY "Users can delete their own recipe images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- 6. Verify bucket was created
SELECT * FROM storage.buckets WHERE id = 'recipe-images';
