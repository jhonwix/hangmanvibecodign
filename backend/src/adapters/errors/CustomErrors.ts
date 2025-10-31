export class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(resource: string, id?: number | string) {
    const message = id
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    super(message, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, public details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class GameStateError extends CustomError {
  constructor(message: string) {
    super(message, 400, 'GAME_STATE_ERROR');
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string, public originalError?: Error) {
    super(message, 500, 'DATABASE_ERROR');
  }
}

export class DuplicateError extends CustomError {
  constructor(resource: string, field: string, value: string) {
    super(
      `${resource} with ${field} '${value}' already exists`,
      409,
      'DUPLICATE_ERROR'
    );
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden access') {
    super(message, 403, 'FORBIDDEN');
  }
}
