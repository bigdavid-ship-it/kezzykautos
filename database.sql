-- ==========================================
-- KEZZYK AUTOS — SUPABASE SCHEMA MIGRATION
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TABLES
-- ==========================================

-- VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    
    -- Basic Info
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    condition TEXT NOT NULL, -- 'New', 'Foreign Used', 'Locally Used'
    availability TEXT NOT NULL DEFAULT 'Available', -- 'Available', 'Reserved', 'Sold'
    
    -- Specs
    mileage INTEGER,
    transmission TEXT NOT NULL, -- 'Automatic', 'Manual', 'CVT'
    fuel_type TEXT NOT NULL, -- 'Petrol', 'Diesel', 'Electric', 'Hybrid'
    engine TEXT,
    body_type TEXT NOT NULL, -- 'Sedan', 'SUV', 'Coupe', 'Hatchback', 'Pickup', etc.
    color TEXT,
    
    -- Details
    description TEXT,
    features TEXT[] DEFAULT '{}',
    location TEXT DEFAULT 'Lagos, Nigeria',
    
    -- Media
    cover_image_url TEXT,
    
    -- Metadata
    featured BOOLEAN DEFAULT FALSE,
    slug TEXT UNIQUE NOT NULL,
    seo_title TEXT,
    seo_description TEXT
);

-- VEHICLE MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.vehicle_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
    sort_order INTEGER DEFAULT 0,
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Resolved', 'Archived'
    type TEXT NOT NULL, -- 'Vehicle Inquiry', 'General Contact'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);


-- ==========================================
-- 2. INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON public.vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_vehicles_make_model ON public.vehicles(make, model);
CREATE INDEX IF NOT EXISTS idx_vehicles_availability ON public.vehicles(availability);
CREATE INDEX IF NOT EXISTS idx_vehicle_media_vehicle_id ON public.vehicle_media(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);


-- ==========================================
-- 3. TRIGGERS FOR UPDATED_AT
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_vehicles_updated_at ON public.vehicles;
CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON public.vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==========================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Vehicles: Anyone can read, only authenticated admin can modify
CREATE POLICY "Public can view vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Admins can insert vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update vehicles" ON public.vehicles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete vehicles" ON public.vehicles FOR DELETE USING (auth.role() = 'authenticated');

-- Vehicle Media: Anyone can read, only authenticated admin can modify
CREATE POLICY "Public can view vehicle media" ON public.vehicle_media FOR SELECT USING (true);
CREATE POLICY "Admins can insert vehicle media" ON public.vehicle_media FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update vehicle media" ON public.vehicle_media FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete vehicle media" ON public.vehicle_media FOR DELETE USING (auth.role() = 'authenticated');

-- Inquiries: Anyone can insert (contact form), only authenticated admin can read/modify
CREATE POLICY "Public can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view inquiries" ON public.inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update inquiries" ON public.inquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete inquiries" ON public.inquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Settings: Anyone can read, only authenticated admin can modify
CREATE POLICY "Public can view settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Admins can modify settings" ON public.website_settings FOR ALL USING (auth.role() = 'authenticated');


-- ==========================================
-- 5. STORAGE BUCKETS (Need to be created in UI or via SQL if superuser)
-- ==========================================
-- Insert into storage.buckets if using SQL
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies for 'vehicle-images'
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'vehicle-images' );

CREATE POLICY "Admin Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'vehicle-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Update Access" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'vehicle-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Delete Access" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'vehicle-images' AND auth.role() = 'authenticated' );
