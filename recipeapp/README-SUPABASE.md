# Supabase Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Database Setup

Run the SQL commands from `PRD/Table.sql` in your Supabase SQL Editor to create all the necessary tables.

## File Structure

```
lib/
├── supabase/
│   ├── client.ts      # Browser client
│   ├── server.ts      # Server client
│   └── middleware.ts   # Auth middleware
├── auth.ts            # Authentication helpers
├── recipes.ts         # Recipe operations
└── supabase.ts        # Legacy client (for compatibility)

types/
└── database.ts        # TypeScript types for database

middleware.ts           # Next.js middleware for auth
```

## Usage Examples

### Client-side (Browser)
```typescript
import { getRecipes, createRecipe } from '@/lib/recipes'
import { signIn, signUp } from '@/lib/auth'

// Get recipes
const { data: recipes, error } = await getRecipes()

// Create recipe
const { data, error } = await createRecipe({
  title: 'My Recipe',
  slug: 'my-recipe',
  user_id: 'user-id',
  // ... other fields
})
```

### Server-side (Server Components)
```typescript
import { getServerRecipes } from '@/lib/recipes'
import { getServerUser } from '@/lib/auth'

// In a Server Component
const { data: recipes } = await getServerRecipes()
const { user } = await getServerUser()
```

## Authentication Flow

1. User signs up/in using `signUp()` or `signIn()`
2. Supabase creates user in `auth.users` table
3. Create profile in `profiles` table (can be done via trigger or manually)
4. User can now create recipes, comments, ratings, etc.

## Next Steps

1. Set up your environment variables
2. Test the connection by running the app
3. Implement authentication pages (login/register)
4. Start building recipe CRUD operations
