import { supabase } from '../../../lib/supabase';

export const signIn = async (email, password) => {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  return data;
};

export const signOut = () => {
  const { error } = supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
