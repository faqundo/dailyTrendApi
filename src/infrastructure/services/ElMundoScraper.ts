// infrastructure/services/ElMundoScraper.ts
import puppeteer from 'puppeteer';

export class ElMundoScraper {
  static async getSourceName(): string {
    return 'El Mundo';
  }

  static async scrape(): Promise<any[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.elmundo.es', { waitUntil: 'networkidle2' });

    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.headline'), (el) => ({
        title: el.textContent?.trim(),
        url: el.querySelector('a')?.href,
      }));
    });

    await browser.close();
    return articles;
  }
}