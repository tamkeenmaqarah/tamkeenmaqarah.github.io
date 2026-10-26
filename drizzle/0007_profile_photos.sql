ALTER TABLE students ADD COLUMN avatar TEXT;
--> statement-breakpoint
ALTER TABLE students ADD COLUMN avatar_source TEXT NOT NULL DEFAULT 'google';
--> statement-breakpoint
ALTER TABLE students ADD COLUMN google_picture TEXT;
