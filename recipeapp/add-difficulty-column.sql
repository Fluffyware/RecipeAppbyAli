-- Add difficulty column to recipes table
-- Run this in Supabase SQL Editor

-- Add difficulty column to recipes table
ALTER TABLE recipes 
ADD COLUMN IF NOT EXISTS difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard'));

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'recipes' AND column_name = 'difficulty';
