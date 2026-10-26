CREATE TABLE IF NOT EXISTS `homework` (
	`id` text PRIMARY KEY NOT NULL,
	`week` text NOT NULL,
	`name` text NOT NULL,
	`body` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `homework_week_name` ON `homework` (`week`,`name`);
--> statement-breakpoint
INSERT OR IGNORE INTO `homework` (`id`,`week`,`name`,`body`,`updated_at`) VALUES
('2026-11-01:yaseen','2026-11-01','Yaseen','Surah al-Jinn, the entire second page.','2026-10-25T15:18:00.000Z'),
('2026-11-01:hassonah','2026-11-01','Hassonah','Surah Nuh, the first half of the page, ayahs 1–10.','2026-10-25T15:35:00.000Z'),
('2026-11-01:ayman','2026-11-01','Ayman','Surah al-Muzzamil, memorize through ayah 10.','2026-10-25T15:38:00.000Z');
