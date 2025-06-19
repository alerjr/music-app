import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svtiyqrmwgtqtzkztzof.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dGl5cXJtd2d0cXR6a3p0em9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTgyODIsImV4cCI6MjA1NzI5NDI4Mn0.jwOpsfE2zK2-mnATyPDnJ1MHzMgEUKkoi78-I5UBcVs';

export const supabase = createClient(supabaseUrl, supabaseKey);
