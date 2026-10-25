CREATE TABLE `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`questions` text NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`regular` integer NOT NULL,
	`bonus` integer NOT NULL,
	`max` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`quiz_id` text NOT NULL,
	`name` text NOT NULL,
	`answers` text NOT NULL,
	`score` integer NOT NULL,
	`max` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
