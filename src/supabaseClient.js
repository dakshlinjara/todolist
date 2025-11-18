import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hpkxlqkokcdevwygbomz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwa3hscWtva2NkZXZ3eWdib216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDM4MzYsImV4cCI6MjA3OTAxOTgzNn0.rwBkiV3ELlT7XH8Ym-REHOL7S4wfPVOPFgj5tIDQs34";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
