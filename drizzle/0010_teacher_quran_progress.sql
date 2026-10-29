ALTER TABLE assignment_progress ADD COLUMN teacher_status text NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE assignment_progress ADD COLUMN teacher_reviewed_at text;
--> statement-breakpoint
UPDATE assignment_progress SET teacher_status=status,teacher_reviewed_at=reviewed_at WHERE reviewed_at IS NOT NULL AND status IN ('reviewed','repeat');
