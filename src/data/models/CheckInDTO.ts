/**
 * CheckInDTO - Data Transfer Object for DailyCheckIn
 * Used for Firebase/Firestore storage (uses snake_case convention)
 */
export interface CheckInDTO {
  id: string;
  user_id: string;
  timestamp: string; // ISO 8601 timestamp
  mood_score: number;
  energy_score: number;
  sleep_hours: number;
  sleep_quality: number;
  notes?: string;
  ai_insight?: string;
  is_morning: boolean;
  synced_to_cloud: boolean;
}

/**
 * Firestore collection name
 */
export const CHECKINS_COLLECTION = 'checkIns';

/**
 * Index for querying check-ins by user and date
 */
export interface CheckInIndex {
  user_id: string;
  date: string; // YYYY-MM-DD format for easier querying
}

/**
 * Type guard to check if object is a valid CheckInDTO
 */
export const isCheckInDTO = (obj: any): obj is CheckInDTO => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.timestamp === 'string' &&
    typeof obj.mood_score === 'number' &&
    typeof obj.energy_score === 'number' &&
    typeof obj.sleep_hours === 'number' &&
    typeof obj.sleep_quality === 'number' &&
    typeof obj.is_morning === 'boolean' &&
    typeof obj.synced_to_cloud === 'boolean'
  );
};

/**
 * SQLite table schema for local storage
 */
export const CHECK_INS_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS check_ins (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    mood_score INTEGER NOT NULL,
    energy_score INTEGER NOT NULL,
    sleep_hours REAL NOT NULL,
    sleep_quality INTEGER NOT NULL,
    notes TEXT,
    ai_insight TEXT,
    is_morning INTEGER NOT NULL,
    synced_to_cloud INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);
  CREATE INDEX IF NOT EXISTS idx_check_ins_timestamp ON check_ins(timestamp);
  CREATE INDEX IF NOT EXISTS idx_check_ins_synced ON check_ins(synced_to_cloud);
`;
