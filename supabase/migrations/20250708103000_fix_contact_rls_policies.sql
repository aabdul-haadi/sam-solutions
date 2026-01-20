/*
  # Fix contact submissions RLS policies

  1. Security Updates
    - Drop all existing conflicting policies on contact_submissions table
    - Create clean, working policies for anonymous submissions
    - Ensure proper access control for reading submissions

  2. Changes
    - Remove all existing INSERT policies that might be conflicting
    - Create single INSERT policy for public users
    - Create single SELECT policy for authenticated users
    - Add public role access for form submissions
*/

-- First, drop ALL existing policies on contact_submissions to start clean
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view contact submissions" ON contact_submissions;

-- Create a single INSERT policy that allows public role submissions
CREATE POLICY "Allow contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a SELECT policy for authenticated users to read submissions
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
