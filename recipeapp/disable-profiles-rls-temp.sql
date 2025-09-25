-- Temporarily disable RLS for profiles table (for testing only)
-- WARNING: This makes the table accessible to everyone - use only for testing!

-- Disable RLS temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Check status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Re-enable RLS after testing
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
