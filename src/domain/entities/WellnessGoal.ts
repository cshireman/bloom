/**
 * WellnessGoal Entity
 * Represents wellness goals that users can select during onboarding
 */
export interface WellnessGoal {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: WellnessCategory;
}

export type WellnessCategory =
  | 'mental-health'
  | 'physical-health'
  | 'sleep'
  | 'productivity'
  | 'relationships'
  | 'mindfulness';

/**
 * Predefined wellness goals for onboarding
 */
export const WELLNESS_GOALS: WellnessGoal[] = [
  {
    id: 'reduce-stress',
    name: 'Reduce Stress',
    description: 'Learn techniques to manage and reduce daily stress',
    icon: '😌',
    category: 'mental-health',
  },
  {
    id: 'better-sleep',
    name: 'Better Sleep',
    description: 'Improve sleep quality and establish healthy sleep habits',
    icon: '😴',
    category: 'sleep',
  },
  {
    id: 'boost-energy',
    name: 'Boost Energy',
    description: 'Increase daily energy levels and reduce fatigue',
    icon: '⚡',
    category: 'physical-health',
  },
  {
    id: 'improve-mood',
    name: 'Improve Mood',
    description: 'Enhance emotional well-being and maintain positive mindset',
    icon: '😊',
    category: 'mental-health',
  },
  {
    id: 'build-habits',
    name: 'Build Healthy Habits',
    description: 'Create and maintain positive daily routines',
    icon: '✅',
    category: 'productivity',
  },
  {
    id: 'mindfulness',
    name: 'Practice Mindfulness',
    description: 'Develop present-moment awareness and meditation practice',
    icon: '🧘',
    category: 'mindfulness',
  },
  {
    id: 'work-life-balance',
    name: 'Work-Life Balance',
    description: 'Find harmony between professional and personal life',
    icon: '⚖️',
    category: 'productivity',
  },
  {
    id: 'self-care',
    name: 'Self-Care',
    description: 'Prioritize personal well-being and self-compassion',
    icon: '💆',
    category: 'mental-health',
  },
];

/**
 * Get goals by category
 */
export const getGoalsByCategory = (category: WellnessCategory): WellnessGoal[] => {
  return WELLNESS_GOALS.filter(goal => goal.category === category);
};

/**
 * Get goal by ID
 */
export const getGoalById = (id: string): WellnessGoal | undefined => {
  return WELLNESS_GOALS.find(goal => goal.id === id);
};
