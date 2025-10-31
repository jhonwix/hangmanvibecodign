import axios, { AxiosInstance, AxiosError } from 'axios'
import { GameState, GuessResult, WordCategory, GameRules } from '../types/game.types'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add any auth headers here if needed
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        const errorMessage = this.handleError(error)
        return Promise.reject(new Error(errorMessage))
      }
    )
  }

  private handleError(error: AxiosError): string {
    if (error.response) {
      const data = error.response.data as any
      return data?.error?.message || data?.message || 'Server error occurred'
    } else if (error.request) {
      return 'No response from server. Please check your connection.'
    } else {
      return error.message || 'An unexpected error occurred'
    }
  }

  // Game endpoints
  async startGame(data?: {
    userId?: number
    wordCategory?: string
    language?: 'en' | 'es'
  }): Promise<GameState> {
    const response = await this.api.post<any>('/games/start', data)
    // Response interceptor already extracts .data, so response.data is the actual API response
    return response.data  // This is response.data.data from the backend
  }

  async guessLetter(gameId: number, letter: string): Promise<GuessResult> {
    const response = await this.api.post<any>(`/games/${gameId}/guess`, { letter })
    return response.data
  }

  async getGameStatus(gameId: number): Promise<GameState> {
    const response = await this.api.get<any>(`/games/${gameId}`)
    return response.data
  }

  async surrender(gameId: number): Promise<any> {
    const response = await this.api.post<any>(`/games/${gameId}/surrender`)
    return response.data
  }

  async getGameHistory(gameId: number): Promise<any> {
    const response = await this.api.get<any>(`/games/${gameId}/history`)
    return response.data
  }

  // Word endpoints
  async getCategories(): Promise<WordCategory[]> {
    const response = await this.api.get<any>('/words/categories')
    return response.data
  }

  async getRandomWord(): Promise<any> {
    const response = await this.api.get<any>('/words/random')
    return response.data
  }

  // Rules endpoints
  async getRules(language: 'en' | 'es' = 'en'): Promise<GameRules> {
    const response = await this.api.get<any>('/rules', {
      params: { lang: language },
    })
    return response.data
  }

  async getTips(language: 'en' | 'es' = 'en'): Promise<any> {
    const response = await this.api.get<any>('/rules/tips', {
      params: { lang: language },
    })
    return response.data
  }

  // Health check
  async healthCheck(): Promise<any> {
    const response = await this.api.get<any>('/health')
    return response.data
  }
}

const apiService = new ApiService()
export { apiService }
export default apiService
