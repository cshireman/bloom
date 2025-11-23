# AI-Powered Wellness Coach App - Development Instructions

## Project Overview
Build a mobile wellness app combining AI-powered daily check-ins with habit tracking. Provides personalized wellness insights based on mood, energy, and sleep quality patterns.

## Technology Stack
- **Frontend**: React Native
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **AI**: OpenAI GPT-4-mini or Anthropic Claude API
- **Local Storage**: AsyncStorage/SQLite
- **Notifications**: Firebase Cloud Messaging
- **State Management**: Redux

## Architecture

### Hybrid Clean Architecture + MVVM Approach

Bloom uses a pragmatic hybrid architecture combining Clean Architecture principles with MVVM patterns. This approach balances rapid development (14-day timeline) with maintainability and testability.

**Why This Architecture for Bloom:**
- **Multiple Data Sources**: Clean separation between Firebase, SQLite, and AI services
- **Complex Business Logic**: Streak calculations, correlation analysis, and offline sync need isolation
- **Testability**: Core wellness logic can be tested independently of UI and frameworks
- **Scalability**: Easy to add premium features, new AI providers, or data export capabilities
- **React Native Friendly**: MVVM pattern aligns naturally with React hooks and components

**Key Principles:**
1. **Domain Layer** contains business logic with zero external dependencies
2. **Data Layer** handles all external I/O (API, database, storage)
3. **Presentation Layer** uses ViewModels (custom hooks) to access use cases
4. **Dependency Injection** keeps layers loosely coupled
5. **Unidirectional Data Flow** through Redux for global state

### Folder Structure

```
src/
├── domain/                          # Business Logic Layer (Framework Independent)
│   ├── entities/                    # Core business objects
│   │   ├── UserProfile.ts
│   │   ├── DailyCheckIn.ts
│   │   ├── Habit.ts
│   │   └── WellnessGoal.ts
│   ├── usecases/                    # Business use cases (one per action)
│   │   ├── auth/
│   │   │   ├── SignInUseCase.ts
│   │   │   ├── SignUpUseCase.ts
│   │   │   └── SignOutUseCase.ts
│   │   ├── checkin/
│   │   │   ├── SubmitCheckInUseCase.ts
│   │   │   ├── GetTodayCheckInUseCase.ts
│   │   │   └── GetCheckInHistoryUseCase.ts
│   │   ├── habits/
│   │   │   ├── CreateHabitUseCase.ts
│   │   │   ├── CompleteHabitUseCase.ts
│   │   │   ├── CalculateStreakUseCase.ts
│   │   │   └── GetHabitCorrelationsUseCase.ts
│   │   ├── insights/
│   │   │   ├── GenerateAIInsightUseCase.ts
│   │   │   ├── AnalyzeWeeklyPatternsUseCase.ts
│   │   │   └── GetPersonalizedTipsUseCase.ts
│   │   └── premium/
│   │       ├── StartSubscriptionUseCase.ts
│   │       └── ExportDataUseCase.ts
│   └── repositories/                # Repository interfaces (contracts)
│       ├── IAuthRepository.ts
│       ├── ICheckInRepository.ts
│       ├── IHabitRepository.ts
│       ├── IUserRepository.ts
│       └── IAIInsightRepository.ts
│
├── data/                            # Data Layer (External I/O)
│   ├── repositories/                # Repository implementations
│   │   ├── AuthRepository.ts
│   │   ├── CheckInRepository.ts
│   │   ├── HabitRepository.ts
│   │   ├── UserRepository.ts
│   │   └── AIInsightRepository.ts
│   ├── datasources/                 # Data source abstractions
│   │   ├── remote/
│   │   │   ├── FirebaseAuthDataSource.ts
│   │   │   ├── FirestoreDataSource.ts
│   │   │   └── OpenAIDataSource.ts
│   │   └── local/
│   │       ├── SQLiteDataSource.ts
│   │       └── AsyncStorageDataSource.ts
│   ├── models/                      # DTOs (Data Transfer Objects)
│   │   ├── UserDTO.ts
│   │   ├── CheckInDTO.ts
│   │   └── HabitDTO.ts
│   ├── mappers/                     # Convert DTOs ↔ Domain entities
│   │   ├── UserMapper.ts
│   │   ├── CheckInMapper.ts
│   │   └── HabitMapper.ts
│   └── sync/                        # Offline-first sync logic
│       ├── SyncManager.ts
│       └── SyncQueue.ts
│
├── presentation/                    # Presentation Layer (MVVM)
│   ├── screens/                     # Screen components
│   │   ├── auth/
│   │   │   ├── SignInScreen.tsx
│   │   │   ├── SignUpScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── checkin/
│   │   │   ├── CheckInScreen.tsx
│   │   │   └── InsightScreen.tsx
│   │   ├── habits/
│   │   │   ├── HabitsScreen.tsx
│   │   │   └── CreateHabitScreen.tsx
│   │   ├── progress/
│   │   │   ├── ProgressScreen.tsx
│   │   │   └── AnalyticsScreen.tsx
│   │   ├── premium/
│   │   │   └── ChatScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   ├── components/                  # Reusable UI components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── checkin/
│   │   │   ├── MoodSlider.tsx
│   │   │   ├── EnergySlider.tsx
│   │   │   └── SleepInput.tsx
│   │   ├── habits/
│   │   │   ├── HabitCard.tsx
│   │   │   ├── StreakCounter.tsx
│   │   │   └── HabitIconPicker.tsx
│   │   └── charts/
│   │       ├── MoodTrendChart.tsx
│   │       ├── HeatMapCalendar.tsx
│   │       └── CorrelationGraph.tsx
│   ├── viewmodels/                  # Custom hooks (ViewModels)
│   │   ├── useAuthViewModel.ts
│   │   ├── useCheckInViewModel.ts
│   │   ├── useHabitsViewModel.ts
│   │   ├── useInsightsViewModel.ts
│   │   └── useProgressViewModel.ts
│   ├── navigation/                  # React Navigation setup
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   └── theme/                       # Design system
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── animations.ts
│
├── infrastructure/                  # Framework & External Dependencies
│   ├── di/                          # Dependency Injection
│   │   ├── container.ts             # DI container setup
│   │   └── hooks.ts                 # useInjection hooks
│   ├── config/                      # Configuration
│   │   ├── firebase.ts
│   │   ├── openai.ts
│   │   └── env.ts
│   ├── services/                    # Platform services
│   │   ├── NotificationService.ts
│   │   ├── AnalyticsService.ts
│   │   └── PurchaseService.ts
│   └── utils/                       # Shared utilities
│       ├── dateUtils.ts
│       ├── validation.ts
│       └── logger.ts
│
└── store/                           # Redux State Management
    ├── slices/
    │   ├── authSlice.ts
    │   ├── checkInSlice.ts
    │   ├── habitsSlice.ts
    │   └── uiSlice.ts
    ├── store.ts
    └── hooks.ts                     # Typed Redux hooks
```

### Layer Responsibilities

#### Domain Layer (`domain/`)
**Purpose**: Contains all business logic with zero dependencies on frameworks or external libraries.

**Entities** (`domain/entities/`): Pure TypeScript interfaces/classes representing business concepts:
```typescript
// domain/entities/DailyCheckIn.ts
export interface DailyCheckIn {
  id: string;
  userId: string;
  timestamp: Date;
  moodScore: number;
  energyScore: number;
  sleepHours: number;
  sleepQuality: number;
  notes?: string;
  aiInsight?: string;
  isMorning: boolean;
}
```

**Use Cases** (`domain/usecases/`): Single-responsibility business operations:
```typescript
// domain/usecases/checkin/SubmitCheckInUseCase.ts
export class SubmitCheckInUseCase {
  constructor(
    private checkInRepo: ICheckInRepository,
    private aiRepo: IAIInsightRepository,
    private userRepo: IUserRepository
  ) {}

  async execute(checkIn: DailyCheckIn): Promise<string> {
    // 1. Save check-in
    await this.checkInRepo.save(checkIn);

    // 2. Generate AI insight
    const insight = await this.aiRepo.generateInsight(checkIn);
    await this.checkInRepo.updateInsight(checkIn.id, insight);

    // 3. Update user streak
    const streak = await this.calculateStreak(checkIn.userId);
    await this.userRepo.updateStreak(checkIn.userId, streak);

    return insight;
  }

  private async calculateStreak(userId: string): Promise<number> {
    // Streak calculation logic
  }
}
```

**Repository Interfaces** (`domain/repositories/`): Contracts that data layer implements:
```typescript
// domain/repositories/ICheckInRepository.ts
export interface ICheckInRepository {
  save(checkIn: DailyCheckIn): Promise<void>;
  getById(id: string): Promise<DailyCheckIn | null>;
  getTodayCheckIn(userId: string): Promise<DailyCheckIn | null>;
  getHistory(userId: string, days: number): Promise<DailyCheckIn[]>;
  updateInsight(id: string, insight: string): Promise<void>;
}
```

#### Data Layer (`data/`)
**Purpose**: Implements data access and manages external I/O operations.

**Repositories** (`data/repositories/`): Implement domain repository interfaces:
```typescript
// data/repositories/CheckInRepository.ts
export class CheckInRepository implements ICheckInRepository {
  constructor(
    private firestore: FirestoreDataSource,
    private sqlite: SQLiteDataSource,
    private mapper: CheckInMapper
  ) {}

  async save(checkIn: DailyCheckIn): Promise<void> {
    const dto = this.mapper.toDTO(checkIn);

    // Save locally first (offline-first)
    await this.sqlite.insertCheckIn(dto);

    // Sync to cloud
    try {
      await this.firestore.saveCheckIn(dto);
    } catch (error) {
      // Queue for later sync
      await this.syncQueue.add('checkIn', dto);
    }
  }

  async getTodayCheckIn(userId: string): Promise<DailyCheckIn | null> {
    // Try local first
    const dto = await this.sqlite.getTodayCheckIn(userId);
    return dto ? this.mapper.toDomain(dto) : null;
  }
}
```

**Data Sources** (`data/datasources/`): Platform-specific implementations:
```typescript
// data/datasources/remote/FirestoreDataSource.ts
export class FirestoreDataSource {
  async saveCheckIn(checkIn: CheckInDTO): Promise<void> {
    await firestore()
      .collection('checkIns')
      .doc(checkIn.id)
      .set(checkIn);
  }
}

// data/datasources/local/SQLiteDataSource.ts
export class SQLiteDataSource {
  async insertCheckIn(checkIn: CheckInDTO): Promise<void> {
    const db = await this.getDatabase();
    await db.executeSql(
      'INSERT INTO check_ins VALUES (?, ?, ?, ?, ?, ?)',
      [checkIn.id, checkIn.userId, /* ... */]
    );
  }
}
```

**Mappers** (`data/mappers/`): Convert between DTOs and domain entities:
```typescript
// data/mappers/CheckInMapper.ts
export class CheckInMapper {
  toDTO(entity: DailyCheckIn): CheckInDTO {
    return {
      id: entity.id,
      user_id: entity.userId,
      timestamp: entity.timestamp.toISOString(),
      mood_score: entity.moodScore,
      // ...
    };
  }

  toDomain(dto: CheckInDTO): DailyCheckIn {
    return {
      id: dto.id,
      userId: dto.user_id,
      timestamp: new Date(dto.timestamp),
      moodScore: dto.mood_score,
      // ...
    };
  }
}
```

#### Presentation Layer (`presentation/`)
**Purpose**: UI components and ViewModels following MVVM pattern.

**ViewModels** (`presentation/viewmodels/`): Custom hooks that bridge UI and use cases:
```typescript
// presentation/viewmodels/useCheckInViewModel.ts
export const useCheckInViewModel = () => {
  const dispatch = useAppDispatch();
  const submitUseCase = useInjection(SubmitCheckInUseCase);
  const getTodayUseCase = useInjection(GetTodayCheckInUseCase);

  const [isLoading, setIsLoading] = useState(false);
  const [todayCheckIn, setTodayCheckIn] = useState<DailyCheckIn | null>(null);

  const loadTodayCheckIn = useCallback(async () => {
    const checkIn = await getTodayUseCase.execute();
    setTodayCheckIn(checkIn);
  }, [getTodayUseCase]);

  const submitCheckIn = useCallback(async (data: CheckInFormData) => {
    setIsLoading(true);
    try {
      const checkIn = mapFormToCheckIn(data);
      const insight = await submitUseCase.execute(checkIn);
      dispatch(checkInSubmitted(checkIn));
      return insight;
    } finally {
      setIsLoading(false);
    }
  }, [submitUseCase, dispatch]);

  useEffect(() => {
    loadTodayCheckIn();
  }, [loadTodayCheckIn]);

  return {
    todayCheckIn,
    isLoading,
    submitCheckIn,
    hasCompletedToday: todayCheckIn !== null,
  };
};
```

**Screens** (`presentation/screens/`): React components using ViewModels:
```typescript
// presentation/screens/checkin/CheckInScreen.tsx
export const CheckInScreen = () => {
  const { submitCheckIn, isLoading, hasCompletedToday } = useCheckInViewModel();
  const navigation = useNavigation();

  const handleSubmit = async (data: CheckInFormData) => {
    const insight = await submitCheckIn(data);
    navigation.navigate('Insight', { insight });
  };

  if (hasCompletedToday) {
    return <AlreadyCompletedView />;
  }

  return (
    <CheckInForm onSubmit={handleSubmit} isLoading={isLoading} />
  );
};
```

#### Infrastructure Layer (`infrastructure/`)
**Purpose**: Framework configuration, DI container, and platform services.

**Dependency Injection** (`infrastructure/di/`):
```typescript
// infrastructure/di/container.ts
import { Container } from 'inversify';

const container = new Container();

// Data sources
container.bind(FirestoreDataSource).toSelf().inSingletonScope();
container.bind(SQLiteDataSource).toSelf().inSingletonScope();
container.bind(OpenAIDataSource).toSelf().inSingletonScope();

// Repositories
container.bind<ICheckInRepository>('ICheckInRepository')
  .to(CheckInRepository).inSingletonScope();
container.bind<IHabitRepository>('IHabitRepository')
  .to(HabitRepository).inSingletonScope();

// Use Cases
container.bind(SubmitCheckInUseCase).toSelf();
container.bind(CompleteHabitUseCase).toSelf();

export { container };

// infrastructure/di/hooks.ts
export function useInjection<T>(identifier: any): T {
  return useMemo(() => container.get<T>(identifier), [identifier]);
}
```

### Data Flow Example

**User submits a daily check-in:**
1. **UI** (`CheckInScreen.tsx`) → calls `submitCheckIn()` from ViewModel
2. **ViewModel** (`useCheckInViewModel.ts`) → calls `SubmitCheckInUseCase.execute()`
3. **Use Case** → orchestrates:
   - `CheckInRepository.save()` → saves to SQLite + Firebase
   - `AIInsightRepository.generateInsight()` → calls OpenAI API
   - `UserRepository.updateStreak()` → calculates and updates streak
4. **Repository** → uses data sources (SQLite, Firestore, OpenAI)
5. **Redux Store** → updates global state
6. **UI** → re-renders with new data

**Key Benefits:**
- Business logic (streak calculation) is in use case, testable without Firebase/React
- Swap OpenAI for Claude by changing one data source
- Offline support handled in repository layer
- UI only knows about ViewModels, not data sources

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

## Core Data Models

**Note**: These are domain entities stored in `src/domain/entities/`. See the [Architecture](#architecture) section for complete implementation details including DTOs, mappers, and repository interfaces.

```typescript
// src/domain/entities/UserProfile.ts
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  subscriptionTier?: 'free' | 'premium';
  wellnessGoals: string[];
  checkInStreak: number;
}

// src/domain/entities/DailyCheckIn.ts
export interface DailyCheckIn {
  id: string;
  userId: string;
  timestamp: Date;
  moodScore: number; // 1-10
  energyScore: number; // 1-10
  sleepHours: number;
  sleepQuality: number; // 1-10
  notes?: string;
  aiInsight?: string;
  isMorning: boolean;
}

// src/domain/entities/Habit.ts
export interface Habit {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: string;
  createdAt: Date;
  completedDates: Date[];
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
}
```

**Firestore Schema** (DTOs in `src/data/models/`):
- Collections: `users/`, `checkIns/`, `habits/`
- Use mappers in `src/data/mappers/` to convert between domain entities and Firestore documents
- Field names use snake_case for Firestore (e.g., `user_id`, `mood_score`)

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
**Title:** "Bloom - AI Wellness Coach"
**Subtitle:** "Daily check-ins, AI insights, habit tracking"
**Keywords:** wellness, mental health, mood tracker, AI coach, habit, meditation, mindfulness, bloom

Start building! Focus on the magical daily check-in experience. 🚀
