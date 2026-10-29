ALTER TABLE students ADD archived_at TEXT;
--> statement-breakpoint
ALTER TABLE students ADD management_revision TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
UPDATE students SET management_revision=lower(hex(randomblob(16)));
--> statement-breakpoint
ALTER TABLE assignments ADD kind TEXT NOT NULL DEFAULT 'other';
--> statement-breakpoint
ALTER TABLE assignments ADD objective TEXT NOT NULL DEFAULT 'review';
--> statement-breakpoint
ALTER TABLE assignments ADD surah INTEGER;
--> statement-breakpoint
ALTER TABLE assignments ADD ayah_from INTEGER;
--> statement-breakpoint
ALTER TABLE assignments ADD ayah_to INTEGER;
--> statement-breakpoint
ALTER TABLE assignments ADD lesson_url TEXT;
--> statement-breakpoint
ALTER TABLE assignments ADD quiz_id TEXT;
--> statement-breakpoint
ALTER TABLE assignments ADD withdrawn_at TEXT;
--> statement-breakpoint
ALTER TABLE assignment_progress ADD status TEXT NOT NULL DEFAULT 'ready';
--> statement-breakpoint
ALTER TABLE assignment_progress ADD note TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE assignment_progress ADD feedback TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE assignment_progress ADD version TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE assignment_progress ADD reviewed_at TEXT;
--> statement-breakpoint
UPDATE assignment_progress SET version=lower(hex(randomblob(16)));
