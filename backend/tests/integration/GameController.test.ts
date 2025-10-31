import request from 'supertest';
import app from '../../src/app';

describe.skip('GameController Integration Tests', () => {
  describe('POST /api/games/start', () => {
    it('should start a new game', async () => {
      const response = await request(app)
        .post('/api/games/start')
        .send({ language: 'en' })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('hiddenWord');
      expect(response.body.data.status).toBe('active');
      expect(response.body.data.attemptsRemaining).toBe(6);
    });

    it('should start game with specific category', async () => {
      const response = await request(app)
        .post('/api/games/start')
        .send({ wordCategory: 'animals', language: 'en' })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.category).toBeDefined();
    });

    it('should return 400 for invalid category', async () => {
      const response = await request(app)
        .post('/api/games/start')
        .send({ wordCategory: 'invalid_category' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Hangman API is running');
    });
  });
});
