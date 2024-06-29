import { Books } from "./books.model";

export interface PaginationBooks {
  pageSize: number;
  page: number;
  sort: string;
  sortDirecction: string;
  pagesQuantity: number;
  data: Books[];
  filterValue: {};
  totalRow: number;
}
