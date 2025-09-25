"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const refreshProfile = async () => {
    if (!user) {
      console.log('No user, setting profile to null');
      setProfile(null);
      return;
    }

    console.log('Refreshing profile for user:', user.id);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('Profile query result:', { data, error });

      if (error) {
        console.error('Error fetching profile:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        
        // If profile doesn't exist, create a basic one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating basic profile...');
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              username: user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
            })
            .select()
            .single();

          console.log('Profile creation result:', { newProfile, createError });

          if (createError) {
            console.error('Error creating profile:', {
              message: createError.message,
              code: createError.code,
              details: createError.details,
              hint: createError.hint
            });
            setProfile(null);
          } else {
            console.log('Profile created successfully:', newProfile);
            setProfile(newProfile);
          }
        } else {
          console.log('Other error, setting profile to null');
          setProfile(null);
        }
      } else {
        console.log('Profile loaded successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Exception in refreshProfile:', error);
      setProfile(null);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      console.log('Getting initial session...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Initial session:', session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User changed, refreshing profile...');
      refreshProfile();
    } else {
      console.log('No user, clearing profile');
      setProfile(null);
    }
  }, [user]);

  const value = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
