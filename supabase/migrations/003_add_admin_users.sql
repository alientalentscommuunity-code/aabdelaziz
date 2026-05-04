-- ==========================================
-- MIGRATION: Add Admin Users Table
-- Links Supabase Auth users to admin privileges
-- ==========================================

-- Create admin_users table to track admin privileges
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    
    UNIQUE(user_id),
    UNIQUE(email)
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Admin users can view all admin records
CREATE POLICY "Admin users can view admin list"
    ON admin_users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() AND au.is_active = true
        )
    );

-- Only super_admins can insert/update/delete
CREATE POLICY "Super admins can manage admin users"
    ON admin_users
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role = 'super_admin' 
            AND au.is_active = true
        )
    );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = check_user_id 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to auto-add user to admin_users on first admin signup
CREATE OR REPLACE FUNCTION handle_admin_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- If this is the first admin user, add them automatically
    IF NOT EXISTS (SELECT 1 FROM admin_users LIMIT 1) THEN
        INSERT INTO admin_users (user_id, email, role, is_active)
        VALUES (NEW.id, NEW.email, 'super_admin', true);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-add first admin
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_admin_signup();

-- ==========================================
-- SEED: Add initial admin users manually
-- Uncomment and modify emails below, then run in SQL Editor
-- ==========================================

-- Insert the two admin users (run this after creating auth users)
-- INSERT INTO admin_users (user_id, email, role, is_active)
-- VALUES 
--     ((SELECT id FROM auth.users WHERE email = 'ahmad96abdelaziz@outlook.com'), 'ahmad96abdelaziz@outlook.com', 'admin', true),
--     ((SELECT id FROM auth.users WHERE email = 'ahmad@alientalents.com'), 'ahmad@alientalents.com', 'admin', true)
-- ON CONFLICT (email) DO NOTHING;
