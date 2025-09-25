-- Essential RLS policies for recipe creation
-- This script only creates the minimum required policies

-- Enable RLS on essential tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;

DROP POLICY IF EXISTS "recipes_select_policy" ON recipes;
DROP POLICY IF EXISTS "recipes_insert_policy" ON recipes;
DROP POLICY IF EXISTS "recipes_update_policy" ON recipes;
DROP POLICY IF EXISTS "recipes_delete_policy" ON recipes;

-- Profiles policies
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Recipes policies
CREATE POLICY "recipes_select_policy" ON recipes
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "recipes_insert_policy" ON recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "recipes_update_policy" ON recipes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "recipes_delete_policy" ON recipes
  FOR DELETE USING (auth.uid() = user_id);
