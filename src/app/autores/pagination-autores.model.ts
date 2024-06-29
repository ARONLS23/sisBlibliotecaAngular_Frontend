import { Autor } from "./autor.model";

export interface PaginationAutores {
  pageSize: number;
  page: number;
  sort: string;
  sortDirecction: string;
  pagesQuantity: number;
  data: Autor[];
  filterValue: {};
  totalRow: number;
}
