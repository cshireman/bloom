/**
 * UserDTO - Data Transfer Object for UserProfile
 * Used for Firebase/Firestore storage (uses snake_case convention)
 */
export interface UserDTO {
  id: string;
  email: string;
  display_name: string;
  created_at: string; // ISO 8601 timestamp
  subscription_tier: 'free' | 'premium';
  wellness_goals: string[];
  check_in_streak: number;
  last_check_in_date?: string; // ISO 8601 timestamp
  premium_expires_at?: string; // ISO 8601 timestamp
}

/**
 * Firestore collection name
 */
export const USERS_COLLECTION = 'users';

/**
 * Type guard to check if object is a valid UserDTO
 */
export const isUserDTO = (obj: any): obj is UserDTO => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.display_name === 'string' &&
    typeof obj.created_at === 'string' &&
    (obj.subscription_tier === 'free' || obj.subscription_tier === 'premium') &&
    Array.isArray(obj.wellness_goals) &&
    typeof obj.check_in_streak === 'number'
  );
};
