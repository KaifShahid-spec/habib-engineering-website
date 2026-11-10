-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is staff/admin
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- PUBLIC READ POLICIES (Active items only)
-- ==========================================
CREATE POLICY "Public read active categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Public read active certifications" ON public.certifications FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published blogs" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);

-- ==========================================
-- STAFF WRITE POLICIES (Full access for staff)
-- ==========================================
CREATE POLICY "Staff full access categories" ON public.categories FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access products" ON public.products FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access projects" ON public.projects FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access clients" ON public.clients FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access certifications" ON public.certifications FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access blogs" ON public.blog_posts FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access settings" ON public.settings FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access inquiries" ON public.contact_submissions FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access quotes" ON public.quote_requests FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access newsletter" ON public.newsletter_subscribers FOR ALL USING (public.is_staff());

-- ==========================================
-- PUBLIC INSERT POLICIES (Forms)
-- ==========================================
CREATE POLICY "Public can insert contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert quotes" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);