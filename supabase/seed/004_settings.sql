INSERT INTO public.settings (key, value) VALUES
  ('company_phone', '0326 844 2292'),
  ('company_email', 'info@habibengineering.com.pk'),
  ('address', 'DHA Phase 8, Lahore, Pakistan')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;