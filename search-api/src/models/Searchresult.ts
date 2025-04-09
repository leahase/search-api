export interface SearchResult {
    title: string;
    link: string;
    snippet: string;
    pagemap?: {
      cse_image?: { src: string }[];
    };
  }