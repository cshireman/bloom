import { DailyCheckIn } from '../../domain/entities/DailyCheckIn';
import { CheckInDTO } from '../models/CheckInDTO';

/**
 * CheckInMapper
 * Converts between DailyCheckIn domain entity and CheckInDTO for data persistence
 */
export class CheckInMapper {
  /**
   * Convert domain entity to DTO
   */
  static toDTO(entity: DailyCheckIn): CheckInDTO {
    return {
      id: entity.id,
      user_id: entity.userId,
      timestamp: entity.timestamp.toISOString(),
      mood_score: entity.moodScore,
      energy_score: entity.energyScore,
      sleep_hours: entity.sleepHours,
      sleep_quality: entity.sleepQuality,
      notes: entity.notes,
      ai_insight: entity.aiInsight,
      is_morning: entity.isMorning,
      synced_to_cloud: entity.syncedToCloud,
    };
  }

  /**
   * Convert DTO to domain entity
   */
  static toDomain(dto: CheckInDTO): DailyCheckIn {
    return {
      id: dto.id,
      userId: dto.user_id,
      timestamp: new Date(dto.timestamp),
      moodScore: dto.mood_score,
      energyScore: dto.energy_score,
      sleepHours: dto.sleep_hours,
      sleepQuality: dto.sleep_quality,
      notes: dto.notes,
      aiInsight: dto.ai_insight,
      isMorning: dto.is_morning,
      syncedToCloud: dto.synced_to_cloud,
    };
  }

  /**
   * Convert array of DTOs to domain entities
   */
  static toDomainArray(dtos: CheckInDTO[]): DailyCheckIn[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  /**
   * Convert array of entities to DTOs
   */
  static toDTOArray(entities: DailyCheckIn[]): CheckInDTO[] {
    return entities.map(entity => this.toDTO(entity));
  }

  /**
   * Convert to SQLite row format (with integer booleans)
   */
  static toSQLiteRow(entity: DailyCheckIn): any {
    return {
      id: entity.id,
      user_id: entity.userId,
      timestamp: entity.timestamp.toISOString(),
      mood_score: entity.moodScore,
      energy_score: entity.energyScore,
      sleep_hours: entity.sleepHours,
      sleep_quality: entity.sleepQuality,
      notes: entity.notes || null,
      ai_insight: entity.aiInsight || null,
      is_morning: entity.isMorning ? 1 : 0,
      synced_to_cloud: entity.syncedToCloud ? 1 : 0,
    };
  }

  /**
   * Convert from SQLite row format (with integer booleans)
   */
  static fromSQLiteRow(row: any): DailyCheckIn {
    return {
      id: row.id,
      userId: row.user_id,
      timestamp: new Date(row.timestamp),
      moodScore: row.mood_score,
      energyScore: row.energy_score,
      sleepHours: row.sleep_hours,
      sleepQuality: row.sleep_quality,
      notes: row.notes || undefined,
      aiInsight: row.ai_insight || undefined,
      isMorning: row.is_morning === 1,
      syncedToCloud: row.synced_to_cloud === 1,
    };
  }

  /**
   * Get date string for indexing (YYYY-MM-DD)
   */
  static getDateString(entity: DailyCheckIn): string {
    const date = entity.timestamp;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
