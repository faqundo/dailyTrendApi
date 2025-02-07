import { scrapeNews } from '../infrastructure/FeedScraper';

(async () => {
  try {
    console.log('Iniciando el scraper...');
    await scrapeNews(); // Llama al método principal del scraper
    console.log('Scraping completado.');
  } catch (error) {
    console.error('Error durante el scraping:', error);
  }
})();