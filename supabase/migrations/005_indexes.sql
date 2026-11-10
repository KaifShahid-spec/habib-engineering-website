-- Indexes for faster lookups
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX idx_contact_created ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_quote_created ON public.quote_requests(created_at DESC);