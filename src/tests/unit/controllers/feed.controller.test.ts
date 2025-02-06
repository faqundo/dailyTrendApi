// tests/unit/controllers/feed.controller.test.ts

import request from 'supertest';
import app from '../../../../src/index'; // Importa tu aplicación Express
import { FeedModel } from '../../../../src/infrastructure/persistence/FeedRepository';
import { scrapeNews } from '../../../../src/infrastructure/FeedScraperExample';


jest.mock('../../../../src/infrastructure/FeedScraperExample', () => ({
  scrapeNews: jest.fn().mockResolvedValue(undefined), // Simula el servicio
}));

describe('Feed Controller', () => {
  beforeEach(async () => {
    await FeedModel.deleteMany({});
  });

  describe('POST /feeds', () => {
    it('debería crear un nuevo feed', async () => {
      const response = await request(app)
        .post('/feeds')
        .send({
          title: 'Noticia de prueba',
          description: 'Descripción de la noticia',
          source: 'El País',
          url: 'https://example.com/noticia',
        })
        .expect(201);

      expect(response.body.title).toBe('Noticia de prueba');
      expect(response.body.source).toBe('El País');
    });
  });

  describe('GET /feeds', () => {
    it('debería obtener todos los feeds', async () => {
      await FeedModel.create({
        title: 'Noticia 1',
        description: 'Descripción 1',
        source: 'El Mundo',
        url: 'https://example.com/noticia1',
      });

      const response = await request(app).get('/feeds').expect(200);

      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Noticia 1');
    });
  });

  describe('GET /feeds/:id', () => {
    it('debería obtener un feed por ID', async () => {
      const feed = await FeedModel.create({
        title: 'Noticia única',
        description: 'Descripción única',
        source: 'El País',
        url: 'https://example.com/noticia-unica',
      });

      const response = await request(app).get(`/feeds/${feed._id}`).expect(200);

      expect(response.body.title).toBe('Noticia única');
    });
  });

  describe('PUT /feeds/:id', () => {
    it('debería actualizar un feed existente', async () => {
      const feed = await FeedModel.create({
        title: 'Noticia original',
        source: 'El País',
        url: 'https://example.com/original',
      });

      const response = await request(app)
        .put(`/feeds/${feed._id}`)
        .send({ title: 'Noticia actualizada' })
        .expect(200);

      expect(response.body.title).toBe('Noticia actualizada');
    });
  });

  describe('DELETE /feeds/:id', () => {
    it('debería eliminar un feed existente', async () => {
      const feed = await FeedModel.create({
        title: 'Noticia para eliminar',
        source: 'El Mundo',
        url: 'https://example.com/eliminar',
      });

      await request(app).delete(`/feeds/${feed._id}`).expect(200);

      const deletedFeed = await FeedModel.findById(feed._id);
      expect(deletedFeed).toBeNull();
    });
  });

  describe('POST /scrape', () => {
    it('debería llamar al servicio de scraping y devolver una respuesta exitosa', async () => {
      const response = await request(app).post('/scrape').expect(200);

      expect(response.body.message).toBe('Feeds updated successfully');
      expect(scrapeNews).toHaveBeenCalled(); // Verifica que el servicio fue llamado
    });
  });
});