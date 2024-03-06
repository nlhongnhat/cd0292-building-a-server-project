import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', (): void => {
  describe('endpoint /', (): void => {
    it('GET /', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });
  describe('endpoint api/images', (): void => {
    it('GET api/images with invalid filename', async () => {
      const response = await request.get('/api/images?filename=palmtunnel1&width=200&height=200');
      expect(response.status).toBe(404);
    });
    it('GET api/images with invalid image dimensions', async () => {
      const response = await request.get('/api/images?filename=palmtunnel&width=0&height=0');
      expect(response.status).toBe(400);
    });
    it('GET api/images with valid filename and dimensions', async () => {
      const response = await request.get('/api/images?filename=palmtunnel&width=200&height=200');
      expect(response.status).toBe(200);
    });
  });
});
