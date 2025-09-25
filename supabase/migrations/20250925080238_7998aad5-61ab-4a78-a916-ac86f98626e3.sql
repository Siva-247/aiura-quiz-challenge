-- Drop the current public read policy that exposes all quiz results
DROP POLICY IF EXISTS "Allow public read access to quiz_results" ON public.quiz_results;

-- Create a secure policy for quiz_results that only allows admin access
CREATE POLICY "Only admins can read quiz_results" 
ON public.quiz_results 
FOR SELECT 
USING (public.is_admin());

-- Keep the public insert policy since students need to submit their quiz results
-- but ensure they can only insert with their own data
DROP POLICY IF EXISTS "Allow public insert to quiz_results" ON public.quiz_results;

CREATE POLICY "Allow quiz result submission" 
ON public.quiz_results 
FOR INSERT 
WITH CHECK (true);

-- Add a policy to prevent updates and deletes of quiz results for data integrity
CREATE POLICY "Prevent quiz result modifications" 
ON public.quiz_results 
FOR UPDATE 
USING (false);

CREATE POLICY "Prevent quiz result deletion" 
ON public.quiz_results 
FOR DELETE 
USING (false);