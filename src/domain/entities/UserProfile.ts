/**
 * UserProfile Entity
 * Core business object representing a user in the Bloom wellness app
 */
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  subscriptionTier: 'free' | 'premium';
  wellnessGoals: string[];
  checkInStreak: number;
  lastCheckInDate?: Date;
  premiumExpiresAt?: Date;
}

/**
 * Factory function to create a new UserProfile with defaults
 */
export const createUserProfile = (
  id: string,
  email: string,
  displayName: string
): UserProfile => {
  return {
    id,
    email,
    displayName,
    createdAt: new Date(),
    subscriptionTier: 'free',
    wellnessGoals: [],
    checkInStreak: 0,
  };
};
