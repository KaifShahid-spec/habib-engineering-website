-- Insert Categories
INSERT INTO public.categories (id, name, slug, description) VALUES
  (uuid_generate_v4(), 'Transformers', 'transformers', 'Distribution and power transformers for industrial and utility use.'),
  (uuid_generate_v4(), 'Switchgear', 'switchgear', 'MV and LV switchgear panels and distribution boards.'),
  (uuid_generate_v4(), 'Panels', 'panels', 'Control, protection and automation panels.');

-- Insert Products (Example)
INSERT INTO public.products (category_id, name, slug, description, specs) 
SELECT 
  id, 
  'Oil Immersed Distribution Transformer', 
  'oil-immersed-distribution-transformer', 
  'Standard distribution transformer for industrial and commercial use.',
  '{"kVA Range": "25 - 630", "Voltage Class": "11 kV / 0.415 kV", "Cooling": "ONAN", "Standard": "IEC 60076"}'::jsonb
FROM public.categories WHERE slug = 'transformers';

INSERT INTO public.products (category_id, name, slug, description, specs) 
SELECT 
  id, 
  'Pad Mounted Transformer', 
  'pad-mounted-transformer', 
  'Compact, outdoor-rated pad-mounted transformer for distribution networks.',
  '{"kVA Range": "10 - 630", "Voltage Class": "11 kV / 0.415 kV", "Enclosure": "Weatherproof"}'::jsonb
FROM public.categories WHERE slug = 'transformers';