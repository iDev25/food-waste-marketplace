import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zpsynvwuzvbyczyjheiv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwc3ludnd1enZieWN6eWpoZWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Mzg5MTYsImV4cCI6MjA2NDExNDkxNn0.hT_idY7BbOTwGb-fPlWfGskRzh9sCsv6UzMbLeeyJ8Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
