-- RLS policies for bookmarks and ratings tables
-- Run this after creating the tables

-- Enable RLS on bookmarks table
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "bookmarks_select_policy" ON bookmarks;
DROP POLICY IF EXISTS "bookmarks_insert_policy" ON bookmarks;
DROP POLICY IF EXISTS "bookmarks_delete_policy" ON bookmarks;

-- Bookmarks policies
CREATE POLICY "bookmarks_select_policy" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert_policy" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete_policy" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on ratings table
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "ratings_select_policy" ON ratings;
DROP POLICY IF EXISTS "ratings_insert_policy" ON ratings;
DROP POLICY IF EXISTS "ratings_update_policy" ON ratings;
DROP POLICY IF EXISTS "ratings_delete_policy" ON ratings;

-- Ratings policies
CREATE POLICY "ratings_select_policy" ON ratings
  FOR SELECT USING (true); -- Allow public read for average ratings

CREATE POLICY "ratings_insert_policy" ON ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ratings_update_policy" ON ratings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "ratings_delete_policy" ON ratings
  FOR DELETE USING (auth.uid() = user_id);
