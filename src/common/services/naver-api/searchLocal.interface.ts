export interface SearchLocal {
  lastBuildDate: Date;
  total: number;
  start: number;
  display: number;
  items: SearchLocalItem[];
}

export interface SearchLocalItem {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: number;
  mapy: number;
}
