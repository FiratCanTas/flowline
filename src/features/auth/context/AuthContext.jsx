import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSupabaseSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSupabaseSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within the AuthProvider!');

  return context;
};
