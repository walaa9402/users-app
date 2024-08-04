export interface List<DataT> {
  data: DataT[];
  page: number;
  per_page: number;
  support: Support;
  total: number;
  total_pages: number;
}

export interface Support {
  text: string;
  url: string;
}
