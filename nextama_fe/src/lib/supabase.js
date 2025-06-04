import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qazdscwsithsjwfeqarg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhemRzY3dzaXRoc2p3ZmVxYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODQ3MzEsImV4cCI6MjA2MzA2MDczMX0.MNgV1W5Rebqlnd9yJY8WylmFriU3Zrn08JM34B7aXXE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);