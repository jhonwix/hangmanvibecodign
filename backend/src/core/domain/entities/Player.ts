export class Player {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string | null,
    public statsWins: number,
    public statsLosses: number,
    public readonly createdAt: Date
  ) {}

  incrementWins(): void {
    this.statsWins += 1;
  }

  incrementLosses(): void {
    this.statsLosses += 1;
  }

  getTotalGames(): number {
    return this.statsWins + this.statsLosses;
  }

  getWinRate(): number {
    const total = this.getTotalGames();
    return total > 0 ? (this.statsWins / total) * 100 : 0;
  }

  getLossRate(): number {
    const total = this.getTotalGames();
    return total > 0 ? (this.statsLosses / total) * 100 : 0;
  }

  hasPlayedGames(): boolean {
    return this.getTotalGames() > 0;
  }

  // Get formatted win rate (e.g., "75.50%")
  getFormattedWinRate(): string {
    return `${this.getWinRate().toFixed(2)}%`;
  }

  // Check if player is experienced (played more than X games)
  isExperienced(minGames: number = 10): boolean {
    return this.getTotalGames() >= minGames;
  }
}
