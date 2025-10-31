export interface GameRule {
  title: string;
  description: string;
}

export interface GameRulesResponse {
  language: string;
  rules: GameRule[];
  tips: string[];
  categories: string[];
  maxAttempts: number;
  difficultyLevels: Array<{ level: string; description: string }>;
}

export class GetGameRulesUseCase {
  execute(language: 'en' | 'es' = 'en'): GameRulesResponse {
    if (language === 'es') {
      return this.getRulesInSpanish();
    }
    return this.getRulesInEnglish();
  }

  private getRulesInEnglish(): GameRulesResponse {
    return {
      language: 'en',
      rules: [
        {
          title: 'Objective',
          description:
            'Guess the hidden word letter by letter before running out of attempts.',
        },
        {
          title: 'Attempts',
          description: 'You have 6 incorrect guesses allowed. Each wrong letter costs one attempt.',
        },
        {
          title: 'Guessing',
          description:
            'Click on a letter to guess it. If correct, it will be revealed in the word. If wrong, you lose one attempt.',
        },
        {
          title: 'Victory',
          description: 'You win when you complete the entire word before running out of attempts.',
        },
        {
          title: 'Defeat',
          description: 'You lose if you use all 6 attempts without completing the word.',
        },
        {
          title: 'Surrender',
          description: 'You can surrender at any time to reveal the word and start a new game.',
        },
      ],
      tips: [
        'Start with common vowels (A, E, I, O, U)',
        'Try frequent consonants (R, S, T, N, L)',
        'Use the word category as a hint',
        'Look for common letter patterns',
        'Avoid rare letters (Q, X, Z) initially',
      ],
      categories: ['Animals', 'Objects', 'Fruits', 'Countries', 'Movies'],
      maxAttempts: 6,
      difficultyLevels: [
        { level: 'Easy', description: '4-6 letters, common words' },
        { level: 'Medium', description: '7-9 letters, moderate difficulty' },
        { level: 'Hard', description: '10-12 letters, challenging words' },
      ],
    };
  }

  private getRulesInSpanish(): GameRulesResponse {
    return {
      language: 'es',
      rules: [
        {
          title: 'Objetivo',
          description:
            'Adivina la palabra oculta letra por letra antes de quedarte sin intentos.',
        },
        {
          title: 'Intentos',
          description:
            'Tienes 6 intentos incorrectos permitidos. Cada letra incorrecta cuesta un intento.',
        },
        {
          title: 'Adivinar',
          description:
            'Haz clic en una letra para adivinarla. Si es correcta, se revelará en la palabra. Si es incorrecta, pierdes un intento.',
        },
        {
          title: 'Victoria',
          description: 'Ganas cuando completas la palabra antes de quedarte sin intentos.',
        },
        {
          title: 'Derrota',
          description: 'Pierdes si usas los 6 intentos sin completar la palabra.',
        },
        {
          title: 'Rendirse',
          description: 'Puedes rendirte en cualquier momento para revelar la palabra y comenzar un nuevo juego.',
        },
      ],
      tips: [
        'Comienza con vocales comunes (A, E, I, O, U)',
        'Prueba consonantes frecuentes (R, S, N, L, D)',
        'Usa la categoría de la palabra como pista',
        'Busca patrones comunes de letras',
        'Evita letras raras (Q, X, Z) al principio',
      ],
      categories: ['Animales', 'Objetos', 'Frutas', 'Países', 'Películas'],
      maxAttempts: 6,
      difficultyLevels: [
        { level: 'Fácil', description: '4-6 letras, palabras comunes' },
        { level: 'Medio', description: '7-9 letras, dificultad moderada' },
        { level: 'Difícil', description: '10-12 letras, palabras desafiantes' },
      ],
    };
  }
}
