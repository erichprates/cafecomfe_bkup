import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = 'https://ivbvgltqspevvhlnvenl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YnZnbHRxc3BldnZobG52ZW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTY3ODksImV4cCI6MjA0OTQzMjc4OX0.sz7YwHPLQq1JWtCZ-0Q5BSpv-Qm4qwdivVy0ql48Gj4';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);