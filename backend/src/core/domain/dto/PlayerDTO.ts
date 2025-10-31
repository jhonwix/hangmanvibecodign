export interface PlayerDTO {
  id: number;
  username: string;
  email: string | null;
  stats: PlayerStatsDTO;
  createdAt: Date;
}

export interface PlayerStatsDTO {
  wins: number;
  losses: number;
  totalGames: number;
  winRate: number;
  lossRate: number;
}

export interface CreatePlayerDTO {
  username: string;
  email?: string;
}

export interface UpdatePlayerStatsDTO {
  wins?: number;
  losses?: number;
}
