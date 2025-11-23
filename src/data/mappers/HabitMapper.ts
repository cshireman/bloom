import { Habit } from '../../domain/entities/Habit';
import { HabitDTO } from '../models/HabitDTO';

/**
 * HabitMapper
 * Converts between Habit domain entity and HabitDTO for data persistence
 */
export class HabitMapper {
  /**
   * Convert domain entity to DTO
   */
  static toDTO(entity: Habit): HabitDTO {
    return {
      id: entity.id,
      user_id: entity.userId,
      name: entity.name,
      icon: entity.icon,
      color: entity.color,
      created_at: entity.createdAt.toISOString(),
      completed_dates: entity.completedDates.map(date => date.toISOString()),
      current_streak: entity.currentStreak,
      longest_streak: entity.longestStreak,
      is_active: entity.isActive,
      reminder_time: entity.reminderTime,
    };
  }

  /**
   * Convert DTO to domain entity
   */
  static toDomain(dto: HabitDTO): Habit {
    return {
      id: dto.id,
      userId: dto.user_id,
      name: dto.name,
      icon: dto.icon,
      color: dto.color,
      createdAt: new Date(dto.created_at),
      completedDates: dto.completed_dates.map(date => new Date(date)),
      currentStreak: dto.current_streak,
      longestStreak: dto.longest_streak,
      isActive: dto.is_active,
      reminderTime: dto.reminder_time,
    };
  }

  /**
   * Convert array of DTOs to domain entities
   */
  static toDomainArray(dtos: HabitDTO[]): Habit[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  /**
   * Convert array of entities to DTOs
   */
  static toDTOArray(entities: Habit[]): HabitDTO[] {
    return entities.map(entity => this.toDTO(entity));
  }

  /**
   * Convert to SQLite row format (main habits table)
   */
  static toSQLiteRow(entity: Habit): any {
    return {
      id: entity.id,
      user_id: entity.userId,
      name: entity.name,
      icon: entity.icon,
      color: entity.color,
      created_at: entity.createdAt.toISOString(),
      current_streak: entity.currentStreak,
      longest_streak: entity.longestStreak,
      is_active: entity.isActive ? 1 : 0,
      reminder_time: entity.reminderTime || null,
      synced_to_cloud: 0, // Default to not synced
    };
  }

  /**
   * Convert completed dates to SQLite completion rows
   */
  static completedDatesToSQLiteRows(habitId: string, dates: Date[]): any[] {
    return dates.map(date => ({
      habit_id: habitId,
      completed_date: date.toISOString().split('T')[0], // YYYY-MM-DD format
    }));
  }

  /**
   * Convert from SQLite row format (main habit + separate completions)
   */
  static fromSQLiteRow(habitRow: any, completionRows: any[]): Habit {
    return {
      id: habitRow.id,
      userId: habitRow.user_id,
      name: habitRow.name,
      icon: habitRow.icon,
      color: habitRow.color,
      createdAt: new Date(habitRow.created_at),
      completedDates: completionRows.map(row => new Date(row.completed_date)),
      currentStreak: habitRow.current_streak,
      longestStreak: habitRow.longest_streak,
      isActive: habitRow.is_active === 1,
      reminderTime: habitRow.reminder_time || undefined,
    };
  }

  /**
   * Format date for habit completion tracking (YYYY-MM-DD)
   */
  static formatDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Get today's date string for comparison
   */
  static getTodayString(): string {
    return this.formatDateString(new Date());
  }
}
