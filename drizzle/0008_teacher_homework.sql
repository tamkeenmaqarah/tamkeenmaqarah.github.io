CREATE TABLE assignments (
 id TEXT PRIMARY KEY NOT NULL,
 week TEXT NOT NULL,
 title TEXT NOT NULL,
 body TEXT NOT NULL,
 student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
 revision TEXT NOT NULL,
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE INDEX assignments_week ON assignments(week);
--> statement-breakpoint
CREATE TABLE assignment_progress (
 assignment_id TEXT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
 student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
 completed_at TEXT NOT NULL,
 PRIMARY KEY(assignment_id,student_id)
);
