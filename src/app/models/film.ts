export class Film {
  title: string = '';
  episode_id: string = '';
  opening_crawl: string = '';
  director: string = '';
  producer: string = '';
  release_date: Date = new Date();
  characters: string[] = [];
  planets: string[] = [];
  starships: string[] = [];
  vehicles: string[] = [];
  species: string[] = [];
  created: Date = new Date();
  edited: Date = new Date();
  url: string = '';
}
