-- Create missing tables for bookmarks and ratings
-- Run this in Supabase SQL Editor

-- ===========================================
-- 1. Create bookmarks table
-- ===========================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- ===========================================
-- 2. Create ratings table
-- ===========================================
CREATE TABLE IF NOT EXISTS ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- ===========================================
-- 3. Enable RLS on both tables
-- ===========================================
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- 4. Create RLS policies for bookmarks
-- ===========================================
CREATE POLICY "Users can view their own bookmarks" ON bookmarks
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks" ON bookmarks
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON bookmarks
FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- 5. Create RLS policies for ratings
-- ===========================================
CREATE POLICY "Users can view all ratings" ON ratings
FOR SELECT USING (true);

CREATE POLICY "Users can create their own ratings" ON ratings
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON ratings
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" ON ratings
FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- 6. Create indexes for better performance
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_recipe_id ON bookmarks(recipe_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_recipe_id ON ratings(recipe_id);

-- ===========================================
-- 7. Verify tables were created
-- ===========================================
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('bookmarks', 'ratings') 
ORDER BY table_name, ordinal_position;
