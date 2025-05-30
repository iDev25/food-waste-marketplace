import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://zpsynvwuzvbyczyjheiv.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwc3ludnd1enZieWN6eWpoZWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Mzg5MTYsImV4cCI6MjA2NDExNDkxNn0.hT_idY7BbOTwGb-fPlWfGskRzh9sCsv6UzMbLeeyJ8Y'
);
