-- Fix security issues by ensuring RLS is enabled on all tables
-- Enable RLS on registrations and quiz_results tables

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;