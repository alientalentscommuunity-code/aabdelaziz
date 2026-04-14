-- ==========================================
-- CMS CONTENT SYSTEM MIGRATION
-- Full content management for AABDELAZIZ portfolio
-- Created: April 13, 2026
-- ==========================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. SECTIONS TABLE (Main page categories)
-- ==========================================
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    path VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. CONTENT BLOCKS (Individual content pieces)
-- ==========================================
CREATE TABLE IF NOT EXISTS content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
    block_key VARCHAR(100) NOT NULL,
    block_type VARCHAR(50) NOT NULL, -- 'text', 'markdown', 'list', 'tags', 'hero', 'quote', 'cta'
    
    -- Content fields
    title VARCHAR(500),
    subtitle VARCHAR(500),
    content TEXT,
    content_json JSONB DEFAULT '{}',
    
    -- Styling
    icon VARCHAR(50),
    accent_color VARCHAR(20), -- 'pink', 'orange', 'purple', 'green', 'blue'
    text_align VARCHAR(20) DEFAULT 'left', -- 'left', 'center', 'right'
    
    -- Layout
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(section_id, block_key)
);

-- ==========================================
-- 3. LIST ITEMS (For bullet lists)
-- ==========================================
CREATE TABLE IF NOT EXISTS list_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID REFERENCES content_blocks(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    icon VARCHAR(50),
    link_url VARCHAR(500),
    accent_color VARCHAR(20),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. CONTENT TAGS (For chips/badges)
-- ==========================================
CREATE TABLE IF NOT EXISTS content_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID REFERENCES content_blocks(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,
    emoji VARCHAR(10),
    accent_color VARCHAR(20),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. SOCIAL LINKS (Dynamic social media)
-- ==========================================
CREATE TABLE IF NOT EXISTS social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_name VARCHAR(100),
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. NAVIGATION ITEMS (Dynamic nav)
-- ==========================================
CREATE TABLE IF NOT EXISTS nav_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    href VARCHAR(200) NOT NULL,
    accent_color VARCHAR(20),
    is_external BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 7. PAGE METADATA (SEO settings)
-- ==========================================
CREATE TABLE IF NOT EXISTS page_meta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
    page_title VARCHAR(255),
    page_description TEXT,
    keywords TEXT[],
    og_image_url VARCHAR(500),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 8. CONTENT VERSIONS (Audit trail)
-- ==========================================
CREATE TABLE IF NOT EXISTS content_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID REFERENCES content_blocks(id) ON DELETE CASCADE,
    title VARCHAR(500),
    content TEXT,
    content_json JSONB,
    edited_by UUID REFERENCES auth.users(id),
    edited_at TIMESTAMPTZ DEFAULT NOW(),
    change_notes TEXT
);

-- ==========================================
-- 9. ANALYTICS / SITE STATS
-- ==========================================
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path VARCHAR(200) NOT NULL,
    referrer VARCHAR(500),
    user_agent TEXT,
    ip_hash VARCHAR(64), -- Hashed for privacy
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 10. ADMIN ACTIVITY LOG
-- ==========================================
CREATE TABLE IF NOT EXISTS admin_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id),
    action VARCHAR(50) NOT NULL, -- 'edit', 'create', 'delete', 'publish'
    entity_type VARCHAR(50) NOT NULL, -- 'content_block', 'list_item', etc.
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active sections" ON sections;
DROP POLICY IF EXISTS "Admin can manage sections" ON sections;
DROP POLICY IF EXISTS "Public can view active content blocks" ON content_blocks;
DROP POLICY IF EXISTS "Admin can manage content blocks" ON content_blocks;
DROP POLICY IF EXISTS "Public can view active list items" ON list_items;
DROP POLICY IF EXISTS "Admin can manage list items" ON list_items;
DROP POLICY IF EXISTS "Public can view active tags" ON content_tags;
DROP POLICY IF EXISTS "Admin can manage tags" ON content_tags;
DROP POLICY IF EXISTS "Public can view active social links" ON social_links;
DROP POLICY IF EXISTS "Admin can manage social links" ON social_links;
DROP POLICY IF EXISTS "Public can view active nav items" ON nav_items;
DROP POLICY IF EXISTS "Admin can manage nav items" ON nav_items;
DROP POLICY IF EXISTS "Admin only page meta" ON page_meta;
DROP POLICY IF EXISTS "Admin only content versions" ON content_versions;
DROP POLICY IF EXISTS "Public insert page views" ON page_views;
DROP POLICY IF EXISTS "Admin can view page views" ON page_views;
DROP POLICY IF EXISTS "Admin only activity log" ON admin_activity;

-- Sections: Public read, Admin write
CREATE POLICY "Public can view active sections" ON sections
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage sections" ON sections
    FOR ALL USING (auth.role() = 'authenticated');

-- Content Blocks: Public read, Admin write
CREATE POLICY "Public can view active content blocks" ON content_blocks
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage content blocks" ON content_blocks
    FOR ALL USING (auth.role() = 'authenticated');

-- List Items: Public read, Admin write
CREATE POLICY "Public can view active list items" ON list_items
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage list items" ON list_items
    FOR ALL USING (auth.role() = 'authenticated');

-- Content Tags: Public read, Admin write
CREATE POLICY "Public can view active tags" ON content_tags
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage tags" ON content_tags
    FOR ALL USING (auth.role() = 'authenticated');

-- Social Links: Public read, Admin write
CREATE POLICY "Public can view active social links" ON social_links
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage social links" ON social_links
    FOR ALL USING (auth.role() = 'authenticated');

-- Nav Items: Public read, Admin write
CREATE POLICY "Public can view active nav items" ON nav_items
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage nav items" ON nav_items
    FOR ALL USING (auth.role() = 'authenticated');

-- Page Meta: Admin only
CREATE POLICY "Admin only page meta" ON page_meta
    FOR ALL USING (auth.role() = 'authenticated');

-- Content Versions: Admin only
CREATE POLICY "Admin only content versions" ON content_versions
    FOR ALL USING (auth.role() = 'authenticated');

-- Page Views: Public insert, Admin select
CREATE POLICY "Public insert page views" ON page_views
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view page views" ON page_views
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admin Activity: Admin only
CREATE POLICY "Admin only activity log" ON admin_activity
    FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- FUNCTIONS
-- ==========================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
DROP TRIGGER IF EXISTS update_content_blocks_updated_at ON content_blocks;
DROP TRIGGER IF EXISTS update_page_meta_updated_at ON page_meta;

CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_meta_updated_at BEFORE UPDATE ON page_meta
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Version creation trigger
CREATE OR REPLACE FUNCTION create_content_version()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO content_versions (block_id, title, content, content_json, edited_at)
    VALUES (OLD.id, OLD.title, OLD.content, OLD.content_json, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS content_version_trigger ON content_blocks;
CREATE TRIGGER content_version_trigger BEFORE UPDATE ON content_blocks
    FOR EACH ROW EXECUTE FUNCTION create_content_version();

-- ==========================================
-- SEED DATA - SECTIONS
-- ==========================================

INSERT INTO sections (key, name, description, path, icon, sort_order) VALUES
('home', 'Home', 'Landing page with hero and intro', '/', 'home', 1),
('human', 'Human Side', 'Personal side - being, connecting, universe', '/human', 'user', 2),
('career', 'Career Galaxy', 'Professional journey and experience', '/career', 'briefcase', 3),
('partners', 'Work With Me', 'Collaboration and partnership options', '/partners', 'handshake', 4),
('sweet_spice', 'Sweet Spice', 'Intentional matchmaking space', '/sweet-spice', 'heart', 5),
('vision_board', 'Vision Board', 'Goals and aspirations visualization', '/vision-board', 'target', 6),
('blog', 'Blog', 'Writings and thoughts', '/blog', 'pen', 7),
('handbook', 'Startup Handbook', 'Startup resources and guides', '/handbook', 'book', 8)
ON CONFLICT (key) DO NOTHING;

-- ==========================================
-- SEED DATA - NAV ITEMS (Matching current navbar)
-- ==========================================

INSERT INTO nav_items (name, href, accent_color, sort_order) VALUES
('Human Side', '/human', NULL, 1),
('Career Side', '/career', NULL, 2),
('Work With Me', '/partners', NULL, 3),
('Sweet Spice', '/sweet-spice', 'pink', 4),
('Vision Board', '/vision-board', 'purple', 5),
('Blog', '/blog', 'purple', 6),
('Startup Handbook', '/handbook', 'orange', 7)
ON CONFLICT DO NOTHING;

-- ==========================================
-- SEED DATA - SOCIAL LINKS
-- ==========================================

INSERT INTO social_links (platform, url, display_name, icon, sort_order) VALUES
('github', 'https://github.com/aabdelaziz', 'GitHub', 'github', 1),
('linkedin', 'https://linkedin.com/in/aabdelaziz', 'LinkedIn', 'linkedin', 2),
('twitter', 'https://twitter.com/aabdelaziz', 'Twitter', 'twitter', 3),
('instagram', 'https://instagram.com/aabdelaziz', 'Instagram', 'instagram', 4)
ON CONFLICT DO NOTHING;

-- ==========================================
-- SEED DATA - HUMAN SECTION CONTENT
-- ==========================================

DO $$
DECLARE
    human_section_id UUID;
BEGIN
    SELECT id INTO human_section_id FROM sections WHERE key = 'human';
    
    -- Hero Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, subtitle, content, accent_color, sort_order)
    VALUES (human_section_id, 'hero', 'hero', 'Ahmad Abdelaziz', 'Human being · Product Manager · Founder · Builder', 'Living with intention. Building with purpose. Exploring what it means to be fully human in a world that wants you to be half of one.', 'orange', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Tagline Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content_json, sort_order)
    VALUES (human_section_id, 'tagline', 'tagline', 'Non-Linear · Good Taste · Relentless · Documenting', 
        '{"tags": ["Non-Linear", "Good Taste", "Relentless", "Documenting"], "emojis": ["📈", "🎨", "🔥", "📝"]}'::jsonb, 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Handbook Quotes Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, icon, accent_color, sort_order)
    VALUES (human_section_id, 'handbook_quotes', 'list', 'Seven Lines That Explain Me', NULL, 'book-open', 'orange', 3)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert list items for handbook quotes
    INSERT INTO list_items (block_id, content, icon, sort_order)
    SELECT cb.id, vals.item_content, vals.item_icon, vals.item_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Starting over... from 0 more than once', 'refresh-cw', 1),
        ('Surviving uncertainty... when nothing was certain', 'shield', 2),
        ('Like a Porsche... if life were a car', 'car', 3),
        ('Bad character?... I''ve seen it before', 'eye', 4),
        ('Kindness as structure... not just feeling', 'heart', 5),
        ('I need you to want me... unapologetically', 'flame', 6),
        ('Listening well... more important than speaking', 'ear', 7)
    ) AS vals(item_content, item_icon, item_order)
    WHERE cb.block_key = 'handbook_quotes' AND cb.section_id = human_section_id
    ON CONFLICT DO NOTHING;

    -- Vanilla Snacks Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, accent_color, sort_order)
    VALUES (human_section_id, 'vanilla_snacks', 'tags', 'Vanilla Snacks', 'green', 4)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert tags for vanilla snacks
    INSERT INTO content_tags (block_id, tag, emoji, sort_order)
    SELECT cb.id, vals.tag_name, vals.tag_emoji, vals.tag_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Music', '🎵', 1),
        ('Learning', '📚', 2),
        ('DIY', '🔧', 3),
        ('Gym', '💪', 4),
        ('Writing', '✍️', 5),
        ('Reading', '📖', 6),
        ('Walking', '🚶', 7),
        ('Photography', '📸', 8),
        ('Hangouts', '☕', 9),
        ('Parties', '🎉', 10),
        ('Travel', '✈️', 11),
        ('Exploration', '🗺️', 12),
        ('Wildness', '🌿', 13),
        ('Experimentation', '🧪', 14),
        ('Imagination', '💭', 15)
    ) AS vals(tag_name, tag_emoji, tag_order)
    WHERE cb.block_key = 'vanilla_snacks' AND cb.section_id = human_section_id
    ON CONFLICT DO NOTHING;

    -- Sweet Spice CTA Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES (human_section_id, 'sweet_spice_cta', 'cta', 'Sweet Spice', 'A space for the right woman to recognize herself. Intentional. Private. Real.', 'pink', 5)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Palestine Stand Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES (human_section_id, 'palestand_message', 'text', 'A Stand', 'What is happening in Palestine is not political complexity. It is an ongoing genocide. I speak about it because silence is complicity. My work, my platform, my presence — all of it includes this truth. There is no separation between being human and standing for humanity.', NULL, 6)
    ON CONFLICT (section_id, block_key) DO NOTHING;

END $$;

-- ==========================================
-- SEED DATA - CAREER SECTION CONTENT
-- ==========================================

DO $$
DECLARE
    career_section_id UUID;
BEGIN
    SELECT id INTO career_section_id FROM sections WHERE key = 'career';

    -- Intro Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, subtitle, content, sort_order)
    VALUES (career_section_id, 'intro', 'markdown', 'Career Galaxy', 'My professional journey', 
        'Product Manager with experience building 0-to-1 products. Obsessed with user experience, growth, and building things that matter. I have worked across fintech, e-commerce, and SaaS — always with a focus on impact and craft.', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Skills Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, accent_color, sort_order)
    VALUES (career_section_id, 'skills', 'tags', 'Skills & Tools', 'purple', 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert skill tags
    INSERT INTO content_tags (block_id, tag, sort_order)
    SELECT cb.id, vals.tag_name, vals.tag_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Product Management', 1),
        ('Strategy', 2),
        ('Growth', 3),
        ('UX Research', 4),
        ('Data Analysis', 5),
        ('React', 6),
        ('TypeScript', 7),
        ('Supabase', 8),
        ('Figma', 9),
        ('SQL', 10)
    ) AS vals(tag_name, tag_order)
    WHERE cb.block_key = 'skills' AND cb.section_id = career_section_id
    ON CONFLICT DO NOTHING;

END $$;

-- ==========================================
-- SEED DATA - SWEET SPICE CONTENT
-- ==========================================

DO $$
DECLARE
    sweet_section_id UUID;
BEGIN
    SELECT id INTO sweet_section_id FROM sections WHERE key = 'sweet_spice';

    -- Landing Page Content
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES 
    (sweet_section_id, 'landing_hero', 'hero', '🌶️ SWEET SPICE', 'Not Just Business. A way of living. A space for connection. Intentional. Private. Real.', 'pink', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES 
    (sweet_section_id, 'landing_why', 'markdown', 'Why This Exists', 
        'Ahmad Abdelaziz is a builder. A product manager. A founder. He has spent years getting clear — financially, professionally, personally. He has been intentional about not rushing into marriage before he was ready. That time is over. He is ready. Mentally. Emotionally. And instead of leaving the search to chance, apps, or social circles — he is architecting the thing he wants with intention and craft.', 
        NULL, 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES 
    (sweet_section_id, 'landing_three_universes', 'markdown', 'The Three Universes', 
        '**I** — Who we each are. Separately. Fully. Two whole people. Separate universes. One collision.

**Wifey** — What we build together. Not a relationship. A life. Built on purpose.

**My Lil Baby Lady Goddess** — The full spectrum. The play. The surrender. The worship. She has never found a man who could hold all of her. Until now.', 
        NULL, 3)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES 
    (sweet_section_id, 'landing_how_works', 'markdown', 'How This Works', 
        '**Read** — See what this actually is. Not a dating profile. An intentional space.

**Feel** — If something here moves you, you will know. It is specific by design.

**Go Further** — If it resonates, there is a deeper version. But you step through the gate first.', 
        NULL, 4)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- The One (Her Portrait) Content
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES 
    (sweet_section_id, 'her_paradox', 'quote', 'The Paradox She Lives In', 
        'She is not one thing. That is exactly what makes her rare and exactly what has made her invisible to the wrong men. She is a baby girl and a deep feminine lioness lady — soft and ferocious, devoted and wild, intellectually dominant and physically surrendered.', 
        NULL, 10),
    (sweet_section_id, 'her_physical', 'text', 'Physical & Origin', 
        'Petite. Under 160cm preferred. 163cm accepted as maximum. Ahmad is 158cm. He wants closeness — eye-level intimacy. A world you are inside when you are together. Minya — or rooted in that warmth, that particular Egyptian depth — is a bonus signal.', 
        NULL, 11),
    (sweet_section_id, 'her_traits', 'list', 'Her Traits — In Threes', NULL, NULL, 12)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert Her Portrait trait items
    INSERT INTO list_items (block_id, content, sort_order)
    SELECT cb.id, vals.item_content, vals.item_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('She leads, she feels, she surrenders — Mentally dominant, emotionally present, physically surrendered when trust is earned', 1),
        ('She is warm, devoted, and family-rooted — Caring, attentive, soft in a way that costs something to maintain', 2),
        ('She is ambitious, curious, and wild — The bare minimum is not a concept she understands', 3),
        ('She teases, she challenges, she plays — She baits, watches reactions, loves being teased back', 4),
        ('She is jealous in the right way — Not insecure. She knows what is hers and moves for it.', 5),
        ('She chooses to surrender — Not because she lost. Because she chose.', 6),
        ('She wants to be chosen, possessed, and free — The priority, held fully, surrender without losing herself', 7)
    ) AS vals(item_content, item_order)
    WHERE cb.block_key = 'her_traits' AND cb.section_id = sweet_section_id
    ON CONFLICT DO NOTHING;

END $$;

-- ==========================================
-- COMPLETION
-- ==========================================

SELECT 'CMS Content System Migration Complete!' as status;
