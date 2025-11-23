/**
 * AIInsightDTO - Data Transfer Object for AI-generated insights
 * Used for caching AI responses and tracking usage
 */
export interface AIInsightDTO {
  id: string;
  user_id: string;
  check_in_id?: string;
  insight_text: string;
  insight_type: 'daily' | 'weekly' | 'correlation' | 'chat';
  created_at: string; // ISO 8601 timestamp
  metadata?: {
    model_used?: string;
    tokens_used?: number;
    response_time_ms?: number;
  };
}

/**
 * Firestore collection name
 */
export const AI_INSIGHTS_COLLECTION = 'aiInsights';

/**
 * Type for tracking AI usage limits
 */
export interface AIUsageDTO {
  user_id: string;
  week_start: string; // ISO 8601 timestamp (Monday of the week)
  insights_count: number;
  chat_messages_count: number;
  subscription_tier: 'free' | 'premium';
}

/**
 * Free tier limits
 */
export const FREE_TIER_LIMITS = {
  INSIGHTS_PER_WEEK: 5,
  CHAT_MESSAGES_PER_WEEK: 0,
};

/**
 * Premium tier limits (unlimited)
 */
export const PREMIUM_TIER_LIMITS = {
  INSIGHTS_PER_WEEK: Infinity,
  CHAT_MESSAGES_PER_WEEK: Infinity,
};

/**
 * Type guard to check if object is a valid AIInsightDTO
 */
export const isAIInsightDTO = (obj: any): obj is AIInsightDTO => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.insight_text === 'string' &&
    ['daily', 'weekly', 'correlation', 'chat'].includes(obj.insight_type) &&
    typeof obj.created_at === 'string'
  );
};

/**
 * SQLite table schema for caching AI insights
 */
export const AI_INSIGHTS_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ai_insights (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    check_in_id TEXT,
    insight_text TEXT NOT NULL,
    insight_type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    model_used TEXT,
    tokens_used INTEGER,
    response_time_ms INTEGER
  );

  CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON ai_insights(user_id);
  CREATE INDEX IF NOT EXISTS idx_ai_insights_check_in_id ON ai_insights(check_in_id);
  CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(insight_type);
  CREATE INDEX IF NOT EXISTS idx_ai_insights_created_at ON ai_insights(created_at);
`;
