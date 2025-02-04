export interface Feed {
  title: string;
  description?: string;
  source: 'El Pais' | 'El Mundo';
  url: string;
  createdAt?: Date;
}

export class FeedEntity implements Feed {
  title: string;
  description?: string;
  source: 'El Pais' | 'El Mundo';
  url: string;
  createdAt?: Date;

  constructor(data: Partial<Feed>) {
    this.title = data.title || '';
    this.description = data.description;
    this.source = data.source || 'El Pais';
    this.url = data.url || '';
    this.createdAt = data.createdAt || new Date();
  }

  // Validación de URL
  isValidUrl(): boolean {
    try {
      new URL(this.url);
      return true;
    } catch {
      return false;
    }
  }

  // Convertir a JSON
  toJSON(): Feed {
    return {
      title: this.title,
      description: this.description,
      source: this.source,
      url: this.url,
      createdAt: this.createdAt,
    };
  }
}