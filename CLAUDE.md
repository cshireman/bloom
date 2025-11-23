# AI-Powered Wellness Coach App - Development Instructions

## Project Overview
Build a mobile wellness app combining AI-powered daily check-ins with habit tracking. Provides personalized wellness insights based on mood, energy, and sleep quality patterns.

## Technology Stack
- **Frontend**: React Native
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **AI**: OpenAI GPT-4-mini or Anthropic Claude API
- **Local Storage**: SQLite/Hive
- **Notifications**: Firebase Cloud Messaging
- **State Management**: Redux 

## 14-Day Development Timeline

### Phase 1: Foundation (Days 1-3)
**User Authentication:**
- Email/password + Google + Apple Sign-In
- Onboarding flow with wellness goal selection

**Daily Check-In Interface:**
- 3-question survey: mood (1-10), energy (1-10), sleep (hours + quality)
- Optional notes field
- Beautiful minimal UI with animations
- Morning vs evening check-in tracking

**Local Storage:**
- SQLite database for check-in history
- Offline-first with cloud sync

### Phase 2: AI Integration (Days 4-6)
**AI Wellness Insights:**
- Daily personalized messages from check-in data
- Weekly pattern analysis and recommendations
- Contextual suggestions based on trends
- System prompt: "You are a supportive wellness coach... provide brief encouraging insight (2-3 sentences) and one actionable tip."

**AI Chat (Premium):**
- Conversational wellness coaching
- Sleep, stress, mood guidance
- Free tier: 5 insights/week, Premium: unlimited

**Cost Management:**
- Use GPT-4-mini (~$0.0001/request)
- Cache common responses
- Rate limiting for free users

### Phase 3: Habit Tracking (Days 7-9)
**Simple Habits:**
- Max 5 active habits (prevents overwhelm)
- Templates: meditation, exercise, water, reading, gratitude
- Custom creation with icon/color picker
- Daily checkboxes + streak counters

**AI Correlation Analysis:**
- "Your mood is 20% higher on days you meditate"
- Visual correlation graphs

**Reminders:**
- Push notifications for check-ins
- Habit reminders with smart timing

### Phase 4: Premium & Visualization (Days 10-12)
**Progress Dashboard:**
- 7-day and 30-day trend charts
- Heat maps and calendar views
- Weekly summary cards

**Premium Implementation:**
- $9.99/month or $79.99/year
- 7-day free trial
- In-app purchase integration
- Features: unlimited AI chat, 10 habits, advanced analytics, data export

### Phase 5: Polish & Launch (Days 13-14)
- UI refinement with smooth animations
- Haptic feedback
- Dark mode
- Onboarding tutorial
- App store assets (screenshots, video, copy)
- Privacy policy

## Data Models
```dart
class UserProfile {
  String id, email, displayName;
  DateTime createdAt;
  String? subscriptionTier; // 'free' or 'premium'
  List<String> wellnessGoals;
  int checkInStreak;
}

class DailyCheckIn {
  String id, userId;
  DateTime timestamp;
  int moodScore, energyScore; // 1-10
  double sleepHours;
  int sleepQuality; // 1-10
  String? notes, aiInsight;
  bool isMorning;
}

class Habit {
  String id, userId, name, icon, color;
  DateTime createdAt;
  List<DateTime> completedDates;
  int currentStreak, longestStreak;
  bool isActive;
}
```

## UI/UX Design
**Colors:**
- Primary: Calming teal (#4DB6AC)
- Secondary: Warm coral (#FF8A65)
- Success: Soft green (#81C784)
- Background: Off-white (#FAFAFA) / Dark (#121212)

**Key Screens:**
1. Home: Today's check-in status, streaks, habit toggles
2. Check-In Flow: Single-screen survey
3. AI Insight: Full-screen shareable card
4. Habits: Grid view with completion
5. Progress: Charts and analytics
6. Chat (Premium): AI conversation
7. Settings: Profile, subscription, export

## Monetization

**Free:** Unlimited check-ins, 5 AI insights/week, 3 habits, 7-day history

**Premium ($9.99/mo or $79.99/yr):** Unlimited AI, 10 habits, full history, advanced analytics, export, themes

**Revenue Projections:**
- 1,000 users @ 8% conversion = $3,350/month
- 10,000 users @ 10% conversion = $33,000-40,000/month

## Marketing Strategy
**Pre-launch:** Product Hunt prep, Reddit posts, social media
**Launch:** PH launch, app reviews, demo videos, $100 Meta ads
**Post-launch:** User feedback, build in public, ASO optimization

## Success Metrics
- DAU: 60%+
- Check-in completion: 70%+
- Free to premium: 8-10%
- Day 7 retention: 50%+
- Day 30 retention: 30%+

## App Store Listing
**Title:** "MindWell - AI Wellness Coach"
**Subtitle:** "Daily check-ins, AI insights, habit tracking"
**Keywords:** wellness, mental health, mood tracker, AI coach, habit, meditation, mindfulness

Start building! Focus on the magical daily check-in experience. 🚀
