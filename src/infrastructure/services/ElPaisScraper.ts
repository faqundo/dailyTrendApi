import puppeteer from 'puppeteer';

export class ElPaisScraper {
  static async getSourceName(): Promise<string> {
    return 'El País';
  }

  static async scrape(): Promise<any[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.elpais.com', { waitUntil: 'networkidle2' });

    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.article-title'), (el) => ({
        title: el.textContent?.trim(),
        url: el.querySelector('a')?.href,
      }));
    });

    await browser.close();
    return articles;
  }
}