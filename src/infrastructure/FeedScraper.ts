// src/infrastructure/FeedScraper.ts

import puppeteer, { Page } from "puppeteer";
import { FeedModel } from "../infrastructure/persistence/FeedRepository";

// Clase base abstracta para scrapers
abstract class NewsScraper {
  abstract getSourceName(): string;
  abstract getBaseUrl(): string;
  abstract extractArticles(page: Page): Promise<any[]>;

  async scrape() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(this.getBaseUrl(), { waitUntil: "networkidle2" });
      const articles = await this.extractArticles(page);

      if (!articles || articles.length === 0) {
        console.warn(`No se encontraron artículos en ${this.getSourceName()}`);
        return;
      }

      // Limitar a 5 artículos por fuente
      const limitedArticles = articles.slice(0, 5);

      for (const article of limitedArticles) {
        if (article.title && article.link) {
          await FeedModel.create({
            title: article.title,
            url: article.link,
            source: this.getSourceName(),
            publishedAt: new Date(),
          });
        }
      }
    } catch (error) {
      console.error(`Error al scraping ${this.getSourceName()}:`, error);
    } finally {
      await browser.close();
    }
  }
}

// Clase concreta para El País
class ElPaisScraper extends NewsScraper {
  getSourceName(): string {
    return "El País";
  }

  getBaseUrl(): string {
    return "https://elpais.com";
  }

  async extractArticles(page: Page): Promise<any[]> {
    return await page.$$eval("article h2 a", (links: any) =>
      links.map((link: any) => ({
        title: link.textContent?.trim() || "",
        link: link.href || "",
      }))
    );
  }
}

// Clase concreta para El Mundo
class ElMundoScraper extends NewsScraper {
  getSourceName(): string {
    return "El Mundo";
  }

  getBaseUrl(): string {
    return "https://www.elmundo.es";
  }

  async extractArticles(page: Page): Promise<any[]> {
    return await page.$$eval(".ue-c-cover-content__link", (links: any) =>
      links.map((link: any) => ({
        title: link.textContent?.trim() || "",
        link: link.href || "",
      }))
    );
  }
}

// Función principal para ejecutar todos los scrapers
export const scrapeNews = async () => {
  const scrapers: NewsScraper[] = [new ElPaisScraper(), new ElMundoScraper()];

  for (const scraper of scrapers) {
    await scraper.scrape();
  }
};