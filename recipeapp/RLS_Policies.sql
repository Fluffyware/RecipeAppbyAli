-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_tags ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Recipes policies
CREATE POLICY "Public recipes are viewable by everyone" ON recipes
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own recipes" ON recipes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recipes" ON recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes" ON recipes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes" ON recipes
  FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- Ratings policies
CREATE POLICY "Ratings are viewable by everyone" ON ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON ratings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" ON ratings
  FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks policies
CREATE POLICY "Users can view their own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Recipe images policies
CREATE POLICY "Recipe images are viewable by everyone" ON recipe_images
  FOR SELECT USING (true);

CREATE POLICY "Users can insert images for their recipes" ON recipe_images
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE id = recipe_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update images for their recipes" ON recipe_images
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE id = recipe_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete images for their recipes" ON recipe_images
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE id = recipe_id AND user_id = auth.uid()
    )
  );

-- Recipe tags policies
CREATE POLICY "Recipe tags are viewable by everyone" ON recipe_tags
  FOR SELECT USING (true);

CREATE POLICY "Users can insert tags for their recipes" ON recipe_tags
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE id = recipe_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tags for their recipes" ON recipe_tags
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE id = recipe_id AND user_id = auth.uid()
    )
  );
