-- Update RLS policies to allow public read access for admin functionality
-- Since we're now using passcode authentication instead of Supabase auth

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Only admins can read registrations" ON public.registrations;
DROP POLICY IF EXISTS "Only admins can read quiz_results" ON public.quiz_results;

-- Create new policies allowing public read access
CREATE POLICY "Allow public read access to registrations" 
ON public.registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to quiz_results" 
ON public.quiz_results 
FOR SELECT 
USING (true);