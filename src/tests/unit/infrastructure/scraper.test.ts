// tests/unit/infrastructure/scraper.test.ts

import request from 'supertest';
import * as puppeteer from 'puppeteer';
import { ElPaisScraper, ElMundoScraper } from '../../../../src/infrastructure/FeedScraper';
import app from '../../../../src/index';

describe('Scrapers', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('ElPaisScraper', () => {
    it('debería extraer noticias de El País', async () => {
      const scraper = new ElPaisScraper();
      const page = await browser.newPage();
      await page.goto('https://elpais.com');

      const articles = await scraper.extractArticles(page);

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      articles.forEach((article) => {
        expect(article.title).toBeDefined();
        expect(article.link).toBeDefined();
      });
    });
  });

  describe('ElMundoScraper', () => {
    it('debería extraer noticias de El Mundo', async () => {
      const scraper = new ElMundoScraper();
      const page = await browser.newPage();
      await page.goto('https://www.elmundo.es');

      const articles = await scraper.extractArticles(page);

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      articles.forEach((article) => {
        expect(article.title).toBeDefined();
        expect(article.link).toBeDefined();
      });
    });
  });


  describe('ElPaisScraper scrapeNews', () => {
    it('debería extraer noticias de El País', async () => {
      const scraper = new ElPaisScraper();
      const page = await browser.newPage();
      await page.goto('https://elpais.com');

      const articles = await scraper.extractArticles(page);

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      articles.forEach((article) => {
        expect(article.title).toBeDefined();
        expect(article.link).toBeDefined();
      });
    });
  });

  describe('Endpoint /scrape', () => {
    it('debería leer feeds de portada desde El País y El Mundo', async () => {
      const response = await request(app).post('/scrape').expect(200);

      expect(response.body.message).toBe('Feeds updated successfully');
    });
  });
});