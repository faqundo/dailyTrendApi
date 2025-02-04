import axios from "axios";
import cheerio from "cheerio";
import { Feed } from "../domain/entities/FeedEntity";

export const scrapeNews = async () => {
  const sources = [
    { name: "El País", url: "https://elpais.com" },
    { name: "El Mundo", url: "https://www.elmundo.es" }
  ];

  for (const source of sources) {
    const response = await axios.get(source.url);
    const $ = cheerio.load(response.data);
    
    $("article h2 a").each(async (_, element) => {
      const title = $(element).text().trim();
      const link = $(element).attr("href");
      if (title && link) {
        await Feed.create({ title, link, source: source.name, publishedAt: new Date() });
      }
    });
  }
};
