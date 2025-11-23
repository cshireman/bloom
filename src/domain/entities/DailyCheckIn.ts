/**
 * DailyCheckIn Entity
 * Represents a user's daily wellness check-in with mood, energy, and sleep data
 */
export interface DailyCheckIn {
  id: string;
  userId: string;
  timestamp: Date;
  moodScore: number; // 1-10 scale
  energyScore: number; // 1-10 scale
  sleepHours: number;
  sleepQuality: number; // 1-10 scale
  notes?: string;
  aiInsight?: string;
  isMorning: boolean;
  syncedToCloud: boolean;
}

/**
 * Validation for check-in scores
 */
export const validateCheckInScores = (checkIn: Partial<DailyCheckIn>): boolean => {
  const { moodScore, energyScore, sleepQuality, sleepHours } = checkIn;

  if (moodScore !== undefined && (moodScore < 1 || moodScore > 10)) {
    return false;
  }
  if (energyScore !== undefined && (energyScore < 1 || energyScore > 10)) {
    return false;
  }
  if (sleepQuality !== undefined && (sleepQuality < 1 || sleepQuality > 10)) {
    return false;
  }
  if (sleepHours !== undefined && (sleepHours < 0 || sleepHours > 24)) {
    return false;
  }

  return true;
};

/**
 * Factory function to create a new DailyCheckIn
 */
export const createDailyCheckIn = (
  userId: string,
  moodScore: number,
  energyScore: number,
  sleepHours: number,
  sleepQuality: number,
  isMorning: boolean,
  notes?: string
): DailyCheckIn => {
  return {
    id: generateCheckInId(),
    userId,
    timestamp: new Date(),
    moodScore,
    energyScore,
    sleepHours,
    sleepQuality,
    notes,
    isMorning,
    syncedToCloud: false,
  };
};

/**
 * Generate a unique check-in ID
 */
const generateCheckInId = (): string => {
  return `checkin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
