-- Create storage bucket for recipe images
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true);

-- Create policy for public access to recipe images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'recipe-images');

-- Create policy for authenticated users to upload recipe images
CREATE POLICY "Authenticated users can upload recipe images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- Create policy for users to update their own recipe images
CREATE POLICY "Users can update their own recipe images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);

-- Create policy for users to delete their own recipe images
CREATE POLICY "Users can delete their own recipe images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'recipe-images' 
  AND auth.role() = 'authenticated'
);
