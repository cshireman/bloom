/**
 * Habit Entity
 * Represents a wellness habit that users can track daily
 */
export interface Habit {
  id: string;
  userId: string;
  name: string;
  icon: string; // Icon name or emoji
  color: string; // Hex color code
  createdAt: Date;
  completedDates: Date[];
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
  reminderTime?: string; // Time in HH:mm format
}

/**
 * Predefined habit templates
 */
export interface HabitTemplate {
  name: string;
  icon: string;
  color: string;
  suggestedReminderTime?: string;
}

export const HABIT_TEMPLATES: HabitTemplate[] = [
  {
    name: 'Meditation',
    icon: '🧘',
    color: '#9C27B0',
    suggestedReminderTime: '07:00',
  },
  {
    name: 'Exercise',
    icon: '💪',
    color: '#FF5722',
    suggestedReminderTime: '06:00',
  },
  {
    name: 'Drink Water',
    icon: '💧',
    color: '#2196F3',
    suggestedReminderTime: '09:00',
  },
  {
    name: 'Reading',
    icon: '📚',
    color: '#795548',
    suggestedReminderTime: '20:00',
  },
  {
    name: 'Gratitude',
    icon: '🙏',
    color: '#4CAF50',
    suggestedReminderTime: '21:00',
  },
];

/**
 * Factory function to create a new Habit
 */
export const createHabit = (
  userId: string,
  name: string,
  icon: string,
  color: string,
  reminderTime?: string
): Habit => {
  return {
    id: generateHabitId(),
    userId,
    name,
    icon,
    color,
    createdAt: new Date(),
    completedDates: [],
    currentStreak: 0,
    longestStreak: 0,
    isActive: true,
    reminderTime,
  };
};

/**
 * Calculate streak from completed dates
 */
export const calculateStreak = (completedDates: Date[]): { current: number; longest: number } => {
  if (completedDates.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Sort dates in descending order
  const sorted = completedDates
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if the most recent completion was today or yesterday
  const mostRecent = new Date(sorted[0]);
  mostRecent.setHours(0, 0, 0, 0);
  const daysDiff = Math.floor((today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 1) {
    currentStreak = 1;
    let currentDate = new Date(mostRecent);

    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i]);
      prevDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(currentDate);
      expectedDate.setDate(expectedDate.getDate() - 1);

      if (prevDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  tempStreak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    current.setHours(0, 0, 0, 0);
    const next = new Date(sorted[i + 1]);
    next.setHours(0, 0, 0, 0);

    const diff = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return { current: currentStreak, longest: longestStreak };
};

/**
 * Check if habit was completed today
 */
export const isCompletedToday = (habit: Habit): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return habit.completedDates.some(date => {
    const completedDate = new Date(date);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  });
};

/**
 * Generate a unique habit ID
 */
const generateHabitId = (): string => {
  return `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
