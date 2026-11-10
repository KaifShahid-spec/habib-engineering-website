-- Create public buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('products', 'products', true),
  ('projects', 'projects', true),
  ('blog', 'blog', true),
  ('certifications', 'certifications', true),
  ('media', 'media', true);

-- Public read access
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('products', 'projects', 'blog', 'certifications', 'media'));

-- Staff write access
CREATE POLICY "Staff write access" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND public.is_staff());
CREATE POLICY "Staff update access" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated' AND public.is_staff());
CREATE POLICY "Staff delete access" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated' AND public.is_staff());