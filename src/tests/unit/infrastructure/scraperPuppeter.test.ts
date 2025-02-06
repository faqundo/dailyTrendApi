// tests/unit/infrastructure/scraper.test.ts

import request from "supertest";
import app from "../../../../src/index"; // Importa la aplicación Express
import { ElPaisScraper, ElMundoScraper } from "../../../../src/infrastructure/FeedScraper";
import puppeteer from "puppeteer";

jest.mock("puppeteer", () => ({
  launch: jest.fn(() =>
    Promise.resolve({
      newPage: jest.fn(() =>
        Promise.resolve({
          goto: jest.fn(() => Promise.resolve()),
          $$eval: jest.fn((selector, callback) =>
            callback([
              { textContent: "Noticia 1", href: "https://example.com/noticia1" },
              { textContent: "Noticia 2", href: "https://example.com/noticia2" },
            ])
          ),
          close: jest.fn(() => Promise.resolve()),
        })
      ),
      close: jest.fn(() => Promise.resolve()),
    })
  ),
}));

describe("Scrapers", () => {
  describe("ElPaisScraper", () => {
    it("debería extraer noticias de El País", async () => {
      const scraper = new ElPaisScraper();
      const page = await puppeteer.launch().then((browser) => browser.newPage());

      const articles = await scraper.extractArticles(page);

      expect(articles.length).toBeGreaterThan(0);
      expect(articles[0].title).toBeDefined();
      expect(articles[0].url).toBeDefined();
    });
  });

  describe("ElMundoScraper", () => {
    it("debería extraer noticias de El Mundo", async () => {
      const scraper = new ElMundoScraper();
      const page = await puppeteer.launch().then((browser) => browser.newPage());

      const articles = await scraper.extractArticles(page);
      console.log("TEST1: ", articles);
      expect(articles.length).toBeGreaterThan(0);
      expect(articles[0].title).toBeDefined();
      expect(articles[0].url).toBeDefined();
    });
  });
});