import { Page } from "puppeteer";
declare abstract class NewsScraper {
    abstract getSourceName(): string;
    abstract getBaseUrl(): string;
    abstract extractArticles(page: Page): Promise<any[]>;
    scrape(): Promise<void>;
}
declare class ElPaisScraper extends NewsScraper {
    getSourceName(): string;
    getBaseUrl(): string;
    extractArticles(page: Page): Promise<any[]>;
}
declare class ElMundoScraper extends NewsScraper {
    getSourceName(): string;
    getBaseUrl(): string;
    extractArticles(page: Page): Promise<any[]>;
}
export declare const scrapeNews: () => Promise<void>;
export { NewsScraper, ElPaisScraper, ElMundoScraper };
