import { IRandomService } from '../../ports/services/IRandomService';

export class RandomService implements IRandomService {
  /**
   * Generate a random integer between min and max (inclusive)
   */
  getRandomInt(min: number, max: number): number {
    if (min > max) {
      throw new Error('Min cannot be greater than max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get a random element from an array
   */
  getRandomElement<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Array cannot be empty');
    }
    const randomIndex = this.getRandomInt(0, array.length - 1);
    return array[randomIndex];
  }

  /**
   * Shuffle an array randomly (Fisher-Yates algorithm)
   */
  shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.getRandomInt(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate a random boolean
   */
  getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }
}
