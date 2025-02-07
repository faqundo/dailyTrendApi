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
      console.log(`Visitando ${this.getBaseUrl()}`);
      await page.goto(this.getBaseUrl(), { waitUntil: "networkidle2" });
      const articles = await this.extractArticles(page);
      console.log('Extrayendo artículos...', articles);
      if (!articles || articles.length === 0) {
        console.warn(`No se encontraron artículos en ${this.getSourceName()}`);
        return;
      }

      // Limitar a 5 artículos por fuente
      const limitedArticles = articles.slice(0, 5);

      for (const article of limitedArticles) {
        if (article.title && article.link) {
          console.log('Guardando artículo...', article.title, article.link);
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
      /* setTimeout(async () => {
        await browser.close();
        console.log('Navegador cerrado');
      }, 10000); */
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
        url: link.href || "",
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
        url: link.href || "",
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

export { NewsScraper, ElPaisScraper, ElMundoScraper };