import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqvixeumuvnmkxhdpyio.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdml4ZXVtdXZubWt4aGRweWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMTI5MjAsImV4cCI6MjA0MDc4ODkyMH0.eHHc2MYQLCU5p5Z0ZNEMpUnOTknPtnMSo_fnUZq4Lfk";

export const supabase = createClient(supabaseUrl, supabaseKey);
