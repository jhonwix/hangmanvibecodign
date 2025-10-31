import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../adapters/errors/CustomErrors';

// Validation schemas
export const schemas = {
  startGame: Joi.object({
    userId: Joi.number().integer().positive().optional(),
    wordCategory: Joi.string()
      .valid('animals', 'objects', 'fruits', 'countries', 'movies')
      .optional(),
    language: Joi.string().valid('en', 'es').optional().default('en'),
  }),

  guessLetter: Joi.object({
    letter: Joi.string()
      .length(1)
      .pattern(/^[A-Za-z]$/)
      .required()
      .messages({
        'string.length': 'Letter must be a single character',
        'string.pattern.base': 'Letter must be A-Z',
        'any.required': 'Letter is required',
      }),
  }),

  createPlayer: Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must not exceed 50 characters',
      'any.required': 'Username is required',
    }),
    email: Joi.string().email().optional().allow(null),
  }),

  gameId: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'Game ID must be a number',
      'number.positive': 'Game ID must be positive',
      'any.required': 'Game ID is required',
    }),
  }),

  playerId: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'Player ID must be a number',
      'number.positive': 'Player ID must be positive',
      'any.required': 'Player ID is required',
    }),
  }),
};

/**
 * Validation middleware factory
 */
export const validate = (schema: Joi.ObjectSchema, property: 'body' | 'params' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return next(new ValidationError('Validation failed', details));
    }

    // Replace request data with validated data
    req[property] = value;
    next();
  };
};
