import puppeteer from "puppeteer";
import { Feed } from "../domain/entities/FeedEntity";

export const scrapeNews = async () => {
  const sources = [
    { name: "El País", url: "https://elpais.com" },
    { name: "El Mundo", url: "https://www.elmundo.es" }
  ];

  const browser = await puppeteer.launch({ headless: true });

  for (const source of sources) {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: "domcontentloaded" });

    let articles;
    if (source.name === "El País") {
      articles = await page.$$eval("article h2 a", links =>
        links.map(link => ({ title: link.textContent?.trim() || "", link: link.href || "" }))
      );
    } else if (source.name === "El Mundo") {
      articles = await page.$$eval(".ue-c-cover-content__link", links =>
        links.map(link => ({ title: link.textContent?.trim() || "", link: link.href || "" }))
      );
    }

    for (const article of articles) {
      if (article.title && article.link) {
        await Feed.create({ ...article, source: source.name, publishedAt: new Date() });
      }
    }

    await page.close();
  }

  await browser.close();
};
