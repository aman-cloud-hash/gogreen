-- Go Green Eco Tech - CockroachDB Queries

-- 0. Create the database (Optional, depends on your setup)
CREATE DATABASE IF NOT EXISTS gogreen;
USE gogreen;

-- 1. Create the settings table to store dashboard data
CREATE TABLE IF NOT EXISTS settings (
    id STRING PRIMARY KEY,
    data JSONB NOT NULL
);

-- 2. Upsert (Insert or Update) data for a section
-- Example for Hero section:
UPSERT INTO settings (id, data) VALUES ('gg_hero', '{"title": "Industrial Waste...", "badge": "ISO Certified"}');

-- 3. Fetch data for a specific section
SELECT data FROM settings WHERE id = 'gg_hero';

-- 4. Fetch all settings (used for initializing admin panel and website)
SELECT id, data FROM settings;

-- 5. Delete a specific section/row permanently
DELETE FROM settings WHERE id = 'gg_hero';

-- 6. Show all tables in the database
SHOW TABLES;
