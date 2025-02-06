// src/infrastructure/FeedScraper.ts

import puppeteer from 'puppeteer';
import { FeedModel } from './persistence/FeedRepository';

export const scrapeNews = async () => {
  const sources = [
    { name: 'El País', url: 'https://elpais.com' },
    { name: 'El Mundo', url: 'https://www.elmundo.es' },
  ];

  const browser = await puppeteer.launch({ headless: true });

  for (const source of sources) {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: 'networkidle2' });

    let articles;
    if (source.name === 'El País') {
      articles = await page.$$eval('article h2 a', (links: any) =>
        links.map((link: any) => ({
          title: link.textContent?.trim() || '',
          url: link.href || '',
        }))
      );
    } else if (source.name === 'El Mundo') {
      articles = await page.$$eval('.ue-c-cover-content__link', (links: any) =>
        links.map((link: any) => ({
          title: link.textContent?.trim() || '',
          url: link.href || '',
        }))
      );
    }

    if (articles && articles.length > 0) {
      for (const article of articles.slice(0, 5)) {
        if (article.title && article.url) {
          await FeedModel.create({
            title: article.title,
            url: article.url,
            source: source.name,
            publishedAt: new Date(),
          });
        }
      }
    }
  }

  await browser.close();
};