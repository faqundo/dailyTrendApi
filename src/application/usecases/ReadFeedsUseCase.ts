// application/usecases/ReadFeedsUseCase.ts
import { ElPaisScraper } from '../../infrastructure/services/ElPaisScraper';
import { ElMundoScraper } from '../../infrastructure/services/ElMundoScraper';
import { FeedModel } from '../../infrastructure/persistence/FeedRepository';

export class ReadFeedsUseCase {
  static async execute() {
    const scrapers = [ElPaisScraper, ElMundoScraper];

    for (const Scraper of scrapers) {
      const sourceName = await Scraper.getSourceName();
      const articles = await Scraper.scrape();

      for (const article of articles) {
        await FeedModel.create({
          ...article,
          source: sourceName,
        });
      }
    }
  }
}