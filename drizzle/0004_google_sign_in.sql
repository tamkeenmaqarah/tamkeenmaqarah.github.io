ALTER TABLE `students` ADD `google_sub` text;--> statement-breakpoint
ALTER TABLE `students` ADD `has_password` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `students_google_sub_unique` ON `students` (`google_sub`);