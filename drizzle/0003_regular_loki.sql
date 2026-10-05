PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` text,
	`priority` text DEFAULT 'medium',
	`completed` integer DEFAULT false,
	`created_at` text
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "title", "description", "due_date", "priority", "completed", "created_at") SELECT "id", "title", "description", "due_date", "priority", "completed", "created_at" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;