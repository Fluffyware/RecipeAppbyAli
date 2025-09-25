-- Simple Bookmarks Setup - Run this if you get policy errors
-- This script only creates what's missing

-- ===========================================
-- 1. Create bookmarks table (if not exists)
-- ===========================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- ===========================================
-- 2. Create ratings table (if not exists)
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
-- 3. Enable RLS (safe - won't error if already enabled)
-- ===========================================
DO $$ 
BEGIN
    ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN OTHERS THEN
        -- RLS already enabled, ignore error
        NULL;
END $$;

DO $$ 
BEGIN
    ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN OTHERS THEN
        -- RLS already enabled, ignore error
        NULL;
END $$;

-- ===========================================
-- 4. Create policies only if they don't exist
-- ===========================================
DO $$ 
BEGIN
    -- Bookmarks policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookmarks' AND policyname = 'Users can view their own bookmarks') THEN
        CREATE POLICY "Users can view their own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookmarks' AND policyname = 'Users can create their own bookmarks') THEN
        CREATE POLICY "Users can create their own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookmarks' AND policyname = 'Users can delete their own bookmarks') THEN
        CREATE POLICY "Users can delete their own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);
    END IF;
    
    -- Ratings policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ratings' AND policyname = 'Users can view all ratings') THEN
        CREATE POLICY "Users can view all ratings" ON ratings FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ratings' AND policyname = 'Users can create their own ratings') THEN
        CREATE POLICY "Users can create their own ratings" ON ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ratings' AND policyname = 'Users can update their own ratings') THEN
        CREATE POLICY "Users can update their own ratings" ON ratings FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ratings' AND policyname = 'Users can delete their own ratings') THEN
        CREATE POLICY "Users can delete their own ratings" ON ratings FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- ===========================================
-- 5. Create indexes (safe - won't error if already exist)
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_recipe_id ON bookmarks(recipe_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_recipe_id ON ratings(recipe_id);

-- ===========================================
-- 6. Verify setup
-- ===========================================
SELECT 
    'bookmarks' as table_name,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bookmarks') 
         THEN 'EXISTS' 
         ELSE 'MISSING' 
    END as status
UNION ALL
SELECT 
    'ratings' as table_name,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ratings') 
         THEN 'EXISTS' 
         ELSE 'MISSING' 
    END as status;
