/**
 * HabitDTO - Data Transfer Object for Habit
 * Used for Firebase/Firestore storage (uses snake_case convention)
 */
export interface HabitDTO {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color: string;
  created_at: string; // ISO 8601 timestamp
  completed_dates: string[]; // Array of ISO 8601 timestamps
  current_streak: number;
  longest_streak: number;
  is_active: boolean;
  reminder_time?: string; // HH:mm format
}

/**
 * Firestore collection name
 */
export const HABITS_COLLECTION = 'habits';

/**
 * Type guard to check if object is a valid HabitDTO
 */
export const isHabitDTO = (obj: any): obj is HabitDTO => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.icon === 'string' &&
    typeof obj.color === 'string' &&
    typeof obj.created_at === 'string' &&
    Array.isArray(obj.completed_dates) &&
    typeof obj.current_streak === 'number' &&
    typeof obj.longest_streak === 'number' &&
    typeof obj.is_active === 'boolean'
  );
};

/**
 * SQLite table schema for local storage
 */
export const HABITS_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    created_at TEXT NOT NULL,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1,
    reminder_time TEXT,
    synced_to_cloud INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS habit_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id TEXT NOT NULL,
    completed_date TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
    UNIQUE(habit_id, completed_date)
  );

  CREATE INDEX IF NOT EXISTS idx_habits_user_id ON habits(user_id);
  CREATE INDEX IF NOT EXISTS idx_habits_is_active ON habits(is_active);
  CREATE INDEX IF NOT EXISTS idx_habit_completions_habit_id ON habit_completions(habit_id);
  CREATE INDEX IF NOT EXISTS idx_habit_completions_date ON habit_completions(completed_date);
`;
