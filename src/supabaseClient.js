import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wooilerqnkrfdgknwynd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb2lsZXJxbmtyZmRna253eW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NzcyNjgsImV4cCI6MjA3OTQ1MzI2OH0.-PkaiexX1THYA4MaWVJR49pLlwNDgCAI1jhDDMLEC3g'

export const supabase = createClient(supabaseUrl, supabaseKey)
