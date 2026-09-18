import { supabase } from '../../../lib/supabase';

export const signIn = async (email, password) => {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
