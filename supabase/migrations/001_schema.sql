-- HeiSortland Database Schema
-- Run this in your Supabase SQL editor

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'organizer', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  end_date DATE,
  start_time TEXT NOT NULL DEFAULT '',
  end_time TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '0',
  is_free BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  organizer_id UUID REFERENCES profiles(id),
  organizer_name TEXT NOT NULL DEFAULT '',
  organizer_email TEXT NOT NULL DEFAULT '',
  organizer_phone TEXT NOT NULL DEFAULT '',
  website TEXT,
  suitable_for TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Places
CREATE TABLE IF NOT EXISTS places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  type_label TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  opening_hours TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  website TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categories (reference data)
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  gradient TEXT NOT NULL DEFAULT '',
  count INTEGER NOT NULL DEFAULT 0
);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('event-images', 'event-images', true, 5242880)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('place-images', 'place-images', true, 5242880)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies

-- Profiles: users can read all, update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow trigger to insert profiles" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Events: everyone can read approved, organizers can insert, admins can manage all
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved events are viewable by everyone" ON events FOR SELECT USING (status = 'approved');
CREATE POLICY "Organizers can view own events" ON events FOR SELECT USING (auth.uid() = organizer_id);
CREATE POLICY "Admins can view all events" ON events FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Authenticated users can insert events" ON events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Organizers can update own events" ON events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Admins can update all events" ON events FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete events" ON events FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Places: everyone can read, admins can manage
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Places are viewable by everyone" ON places FOR SELECT USING (true);
CREATE POLICY "Admins can insert places" ON places FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update places" ON places FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete places" ON places FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Categories: everyone can read, admins can manage
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Storage RLS: authenticated can upload, everyone can view
CREATE POLICY "Everyone can view images" ON storage.objects FOR SELECT USING (bucket_id IN ('event-images', 'place-images'));
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND bucket_id IN ('event-images', 'place-images')
);
CREATE POLICY "Users can delete own images" ON storage.objects FOR DELETE USING (auth.uid() = owner);

-- Trigger: create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_places_type ON places(type);

-- Seed categories
INSERT INTO categories (id, label, description, gradient) VALUES
  ('arrangementer', 'Arrangementer', 'Konserter, festivaler, markeder og mer', 'from-accent to-accent/60'),
  ('barn-og-familie', 'Barn og familie', 'Aktiviteter for små og store', 'from-sage to-sage/60'),
  ('ungdom', 'Ungdom', 'Tilbud og møteplasser for unge', 'from-[#4A6FA5] to-[#4A6FA5/60]'),
  ('kultur-og-musikk', 'Kultur og musikk', 'Kunst, musikk, teater og kultur', 'from-accent to-accent/40'),
  ('sport-og-fritid', 'Sport og fritid', 'Idrett, friluftsliv og trening', 'from-sage to-sage/40'),
  ('kurs-og-læring', 'Kurs og læring', 'Kurs, foredrag og kompetanse', 'from-[#5A6A7A] to-[#5A6A7A/60]'),
  ('frivillighet', 'Frivillighet', 'Bli frivillig eller finn hjelp', 'from-sage to-sage/60'),
  ('mat-og-sosialt', 'Mat og sosialt', 'Kaféer, restauranter og sosiale treff', 'from-accent to-accent/60'),
  ('lokale-tjenester', 'Lokale tjenester', 'Tjenester og tilbud lokalt', 'from-navy to-deep-blue'),
  ('ledige-lokaler', 'Ledige lokaler', 'Utleie av rom og lokaler', 'from-muted to-muted/60'),
  ('transport', 'Transport', 'Buss, båt, fly og samferdsel', 'from-deep-blue to-deep-blue/60'),
  ('kommunale-tilbud', 'Kommunale tilbud', 'Tjenester fra Sortland kommune', 'from-navy to-navy/60'),
  ('ny-i-kommunen', 'Ny i kommunen', 'Tips og info for nye innbyggere', 'from-sage to-sage/60'),
  ('turistinfo', 'Turistinfo', 'For deg som besøker Sortland', 'from-accent to-accent/60')
ON CONFLICT (id) DO NOTHING;
