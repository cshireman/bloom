import { UserProfile } from '../../domain/entities/UserProfile';
import { UserDTO } from '../models/UserDTO';

/**
 * UserMapper
 * Converts between UserProfile domain entity and UserDTO for data persistence
 */
export class UserMapper {
  /**
   * Convert domain entity to DTO
   */
  static toDTO(entity: UserProfile): UserDTO {
    return {
      id: entity.id,
      email: entity.email,
      display_name: entity.displayName,
      created_at: entity.createdAt.toISOString(),
      subscription_tier: entity.subscriptionTier,
      wellness_goals: entity.wellnessGoals,
      check_in_streak: entity.checkInStreak,
      last_check_in_date: entity.lastCheckInDate?.toISOString(),
      premium_expires_at: entity.premiumExpiresAt?.toISOString(),
    };
  }

  /**
   * Convert DTO to domain entity
   */
  static toDomain(dto: UserDTO): UserProfile {
    return {
      id: dto.id,
      email: dto.email,
      displayName: dto.display_name,
      createdAt: new Date(dto.created_at),
      subscriptionTier: dto.subscription_tier,
      wellnessGoals: dto.wellness_goals,
      checkInStreak: dto.check_in_streak,
      lastCheckInDate: dto.last_check_in_date ? new Date(dto.last_check_in_date) : undefined,
      premiumExpiresAt: dto.premium_expires_at ? new Date(dto.premium_expires_at) : undefined,
    };
  }

  /**
   * Convert array of DTOs to domain entities
   */
  static toDomainArray(dtos: UserDTO[]): UserProfile[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  /**
   * Convert array of entities to DTOs
   */
  static toDTOArray(entities: UserProfile[]): UserDTO[] {
    return entities.map(entity => this.toDTO(entity));
  }
}
