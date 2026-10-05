PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` text,
	`priority` text DEFAULT 'medium',
	`completed` integer DEFAULT false,
	`position` integer,
	`created_at` text DEFAULT '2026-03-09T14:02:20.533Z'
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "title", "description", "due_date", "priority", "completed", "position", "created_at") SELECT "id", "title", "description", "due_date", "priority", "completed", "position", "created_at" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;