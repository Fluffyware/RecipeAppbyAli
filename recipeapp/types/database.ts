export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          user_id: string
          title: string
          slug: string
          description: string | null
          ingredients: Json | null
          steps: Json | null
          prep_time: number | null
          cook_time: number | null
          servings: number | null
          category: string | null
          cover_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          slug: string
          description?: string | null
          ingredients?: Json | null
          steps?: Json | null
          prep_time?: number | null
          cook_time?: number | null
          servings?: number | null
          category?: string | null
          cover_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          slug?: string
          description?: string | null
          ingredients?: Json | null
          steps?: Json | null
          prep_time?: number | null
          cook_time?: number | null
          servings?: number | null
          category?: string | null
          cover_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recipe_images: {
        Row: {
          id: string
          recipe_id: string
          url: string
          ordering: number
        }
        Insert: {
          id?: string
          recipe_id: string
          url: string
          ordering?: number
        }
        Update: {
          id?: string
          recipe_id?: string
          url?: string
          ordering?: number
        }
      }
      comments: {
        Row: {
          id: string
          recipe_id: string
          user_id: string
          content: string
          parent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipe_id: string
          user_id: string
          content: string
          parent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recipe_id?: string
          user_id?: string
          content?: string
          parent_id?: string | null
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          recipe_id: string
          user_id: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          recipe_id: string
          user_id: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          recipe_id?: string
          user_id?: string
          rating?: number
          created_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          recipe_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recipe_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recipe_id?: string
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      recipe_tags: {
        Row: {
          recipe_id: string
          tag_id: string
        }
        Insert: {
          recipe_id: string
          tag_id: string
        }
        Update: {
          recipe_id?: string
          tag_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
