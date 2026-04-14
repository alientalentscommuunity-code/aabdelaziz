-- ==========================================
-- MIGRATION: Add Vision, Blog, Handbook, Partners Sections
-- Run this in your Supabase SQL Editor after the first migration
-- ==========================================

-- ==========================================
-- ADD NEW SECTIONS
-- ==========================================

INSERT INTO sections (key, name, description, path, icon, sort_order, is_active) VALUES
('vision', 'Vision Board', 'Vision Board section for life goals and aspirations', '/vision-board', 'target', 5, true),
('blog', 'Blog', 'Blog section for articles and posts', '/blog', 'file-text', 6, true),
('handbook', 'Handbook', 'Handbook section for guides and documentation', '/handbook', 'book-open', 7, true),
('partners', 'Partners', 'Partners and collaborations section', '/partners', 'handshake', 8, true)
ON CONFLICT (key) DO NOTHING;

-- ==========================================
-- SEED DATA - VISION SECTION
-- ==========================================

DO $$
DECLARE
    vision_section_id UUID;
BEGIN
    SELECT id INTO vision_section_id FROM sections WHERE key = 'vision';
    
    -- Hero Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, subtitle, content, accent_color, sort_order)
    VALUES (vision_section_id, 'hero', 'hero', 'Vision Board', 'Where I am going · What I am building · Who I am becoming', 'A living document of intentions, goals, and the future I am actively creating. Not wishes. Commitments.', 'orange', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Vision Categories Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, accent_color, sort_order)
    VALUES (vision_section_id, 'categories', 'tags', 'Life Dimensions', 'orange', 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert tags for vision categories
    INSERT INTO content_tags (block_id, tag, emoji, sort_order)
    SELECT cb.id, vals.tag_name, vals.tag_emoji, vals.tag_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Career', '💼', 1),
        ('Health', '💪', 2),
        ('Relationships', '❤️', 3),
        ('Finance', '💰', 4),
        ('Growth', '📈', 5),
        ('Impact', '🌍', 6)
    ) AS vals(tag_name, tag_emoji, tag_order)
    WHERE cb.block_key = 'categories' AND cb.section_id = vision_section_id
    ON CONFLICT DO NOTHING;

    -- Active Goals Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, icon, accent_color, sort_order)
    VALUES (vision_section_id, 'active_goals', 'list', 'Active Goals', 'target', 'orange', 3)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert list items for active goals
    INSERT INTO list_items (block_id, content, icon, sort_order)
    SELECT cb.id, vals.item_content, vals.item_icon, vals.item_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Build AI Sr. Recruiter MVP with psychometrics integration', 'brain', 1),
        ('Launch personal brand with 10K+ engaged followers', 'rocket', 2),
        ('Establish financial independence runway', 'trending-up', 3),
        ('Create intentional relationship foundation', 'heart', 4)
    ) AS vals(item_content, item_icon, item_order)
    WHERE cb.block_key = 'active_goals' AND cb.section_id = vision_section_id
    ON CONFLICT DO NOTHING;

    -- Completed Milestones Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, icon, accent_color, sort_order)
    VALUES (vision_section_id, 'milestones', 'list', 'Completed Milestones', 'check-circle', 'green', 4)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert list items for milestones
    INSERT INTO list_items (block_id, content, icon, sort_order)
    SELECT cb.id, vals.item_content, vals.item_icon, vals.item_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Shipped AI Recruiter MVP', 'check', 1),
        ('Won AI Hackathon - $2K ROI', 'trophy', 2),
        ('Built portfolio with CMS integration', 'code', 3),
        ('Established multi-vertical skillset', 'layers', 4)
    ) AS vals(item_content, item_icon, item_order)
    WHERE cb.block_key = 'milestones' AND cb.section_id = vision_section_id
    ON CONFLICT DO NOTHING;
END $$;

-- ==========================================
-- SEED DATA - BLOG SECTION
-- ==========================================

DO $$
DECLARE
    blog_section_id UUID;
BEGIN
    SELECT id INTO blog_section_id FROM sections WHERE key = 'blog';
    
    -- Hero Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, subtitle, content, accent_color, sort_order)
    VALUES (blog_section_id, 'hero', 'hero', 'Blog', 'Writing · Thinking · Documenting', 'Raw thoughts on product, technology, and the future I am building. No fluff. Just signal.', 'blue', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Topics Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, accent_color, sort_order)
    VALUES (blog_section_id, 'topics', 'tags', 'Topics', 'blue', 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert tags for blog topics
    INSERT INTO content_tags (block_id, tag, emoji, sort_order)
    SELECT cb.id, vals.tag_name, vals.tag_emoji, vals.tag_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Product', '📦', 1),
        ('AI', '🤖', 2),
        ('Growth', '📈', 3),
        ('Life', '🌱', 4),
        ('Tech', '⚡', 5),
        ('Career', '💼', 6)
    ) AS vals(tag_name, tag_emoji, tag_order)
    WHERE cb.block_key = 'topics' AND cb.section_id = blog_section_id
    ON CONFLICT DO NOTHING;

    -- Featured Post Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES (blog_section_id, 'featured', 'markdown', 'Featured: The Non-Linear Path', 'Most people think careers are ladders. They are not. They are jungle gyms. Here is why embracing chaos led to my biggest wins.', 'blue', 3)
    ON CONFLICT (section_id, block_key) DO NOTHING;
END $$;

-- ==========================================
-- SEED DATA - HANDBOOK SECTION
-- ==========================================

DO $$
DECLARE
    handbook_section_id UUID;
BEGIN
    SELECT id INTO handbook_section_id FROM sections WHERE key = 'handbook';
    
    -- Hero Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, subtitle, content, accent_color, sort_order)
    VALUES (handbook_section_id, 'hero', 'hero', 'Handbook', 'How I work · How I think · How I live', 'Operating principles, mental models, and the frameworks I use to navigate life and build products.', 'orange', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Principles Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, icon, accent_color, sort_order)
    VALUES (handbook_section_id, 'principles', 'list', 'Core Principles', 'book-open', 'orange', 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert list items for principles
    INSERT INTO list_items (block_id, content, icon, sort_order)
    SELECT cb.id, vals.item_content, vals.item_icon, vals.item_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Ship fast. Perfect is the enemy of done.', 'zap', 1),
        ('Talk to users. Everything else is noise.', 'users', 2),
        ('Data informs. Intuition decides.', 'bar-chart', 3),
        ('Constraints breed creativity.', 'box', 4),
        ('Feedback is a gift. Seek it aggressively.', 'gift', 5),
        ('Non-linear growth requires non-linear thinking.', 'trending-up', 6)
    ) AS vals(item_content, item_icon, item_order)
    WHERE cb.block_key = 'principles' AND cb.section_id = handbook_section_id
    ON CONFLICT DO NOTHING;

    -- Mental Models Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, accent_color, sort_order)
    VALUES (handbook_section_id, 'mental_models', 'tags', 'Mental Models', 'orange', 3)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert tags for mental models
    INSERT INTO content_tags (block_id, tag, emoji, sort_order)
    SELECT cb.id, vals.tag_name, vals.tag_emoji, vals.tag_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('First Principles', '🧱', 1),
        ('Second-Order Thinking', '🎯', 2),
        ('Inversion', '⬆️', 3),
        ('Optionality', '🔀', 4),
        ('Compounding', '📈', 5),
        ('Skin in the Game', '⚖️', 6)
    ) AS vals(tag_name, tag_emoji, tag_order)
    WHERE cb.block_key = 'mental_models' AND cb.section_id = handbook_section_id
    ON CONFLICT DO NOTHING;
END $$;

-- ==========================================
-- SEED DATA - PARTNERS SECTION
-- ==========================================

DO $$
DECLARE
    partners_section_id UUID;
BEGIN
    SELECT id INTO partners_section_id FROM sections WHERE key = 'partners';
    
    -- Hero Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, subtitle, content, accent_color, sort_order)
    VALUES (partners_section_id, 'hero', 'hero', 'Partners', 'Collaborations · Investments · Ventures', 'I partner with founders who are building the future. Strategic support, product thinking, and network access.', 'purple', 1)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Partner Types Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, accent_color, sort_order)
    VALUES (partners_section_id, 'partner_types', 'tags', 'What I Bring', 'purple', 2)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert tags for partner types
    INSERT INTO content_tags (block_id, tag, emoji, sort_order)
    SELECT cb.id, vals.tag_name, vals.tag_emoji, vals.tag_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('Product Strategy', '🎯', 1),
        ('Go-to-Market', '🚀', 2),
        ('AI Integration', '🤖', 3),
        ('Fundraising', '💰', 4),
        ('Network', '🕸️', 5),
        ('Mentorship', '👨‍🏫', 6)
    ) AS vals(tag_name, tag_emoji, tag_order)
    WHERE cb.block_key = 'partner_types' AND cb.section_id = partners_section_id
    ON CONFLICT DO NOTHING;

    -- Active Partnerships Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, icon, accent_color, sort_order)
    VALUES (partners_section_id, 'collaborations', 'list', 'Active Collaborations', 'handshake', 'purple', 3)
    ON CONFLICT (section_id, block_key) DO NOTHING;

    -- Insert list items for partnerships
    INSERT INTO list_items (block_id, content, icon, sort_order)
    SELECT cb.id, vals.item_content, vals.item_icon, vals.item_order 
    FROM content_blocks cb
    CROSS JOIN (VALUES
        ('AI Recruiter Platform - Product Advisor', 'brain', 1),
        ('SaaS Growth Collective - Mentor', 'users', 2),
        ('Pre-seed Fund - Scout Partner', 'search', 3)
    ) AS vals(item_content, item_icon, item_order)
    WHERE cb.block_key = 'collaborations' AND cb.section_id = partners_section_id
    ON CONFLICT DO NOTHING;

    -- CTA Block
    INSERT INTO content_blocks (section_id, block_key, block_type, title, content, accent_color, sort_order)
    VALUES (partners_section_id, 'cta', 'cta', 'Partner With Me', 'Building something ambitious? Let us talk. I invest time, expertise, and network in founders who move fast and think big.', 'purple', 4)
    ON CONFLICT (section_id, block_key) DO NOTHING;
END $$;
