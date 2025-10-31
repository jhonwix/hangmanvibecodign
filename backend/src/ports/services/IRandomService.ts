export interface IRandomService {
  /**
   * Generate a random integer between min and max (inclusive)
   */
  getRandomInt(min: number, max: number): number;

  /**
   * Get a random element from an array
   */
  getRandomElement<T>(array: T[]): T;

  /**
   * Shuffle an array randomly
   */
  shuffle<T>(array: T[]): T[];

  /**
   * Generate a random boolean
   */
  getRandomBoolean(): boolean;
}
