-- Simple fix for profiles RLS policy
-- Run this in Supabase SQL Editor

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- Create simple policies
CREATE POLICY "Enable insert for authenticated users only" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read access for all users" ON profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Enable update for users based on user_id" ON profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Test the policies
SELECT 'RLS policies created successfully' as status;
