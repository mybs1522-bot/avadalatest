-- ============================================
-- Students Table for Trial Login Verification
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================

CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  subscription_id TEXT,
  trial_start TIMESTAMPTZ DEFAULT now(),
  trial_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Fast lookup index for login queries (email + phone)
CREATE INDEX IF NOT EXISTS idx_students_email_phone ON students(email, phone);

-- Unique constraint: one student per email+phone combo
CREATE UNIQUE INDEX IF NOT EXISTS idx_students_unique_email_phone ON students(email, phone);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Allow frontend (anon key) to INSERT new students after payment
CREATE POLICY "Allow anon insert" ON students
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow frontend (anon key) to SELECT for login verification
CREATE POLICY "Allow anon select" ON students
  FOR SELECT TO anon
  USING (true);

-- Allow frontend to UPDATE trial_active status
CREATE POLICY "Allow anon update" ON students
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
