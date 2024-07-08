import { Injectable } from '@angular/core';
import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination-books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksList: Books[] = [];
  baseUrl = environment.baseUrl;

  bookSubject = new Subject();
  bookPaginationSubject = new Subject<PaginationBooks>();
  bookPagination: PaginationBooks | undefined;

  constructor(private http: HttpClient) {}

  obtenerLibros(libroPorPagina: number, paginaActual: number, sort: string, sortDirecction: string, filterValue: any) {
    const req = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirecction,
      filterValue
    };
    this.http.post<PaginationBooks>(this.baseUrl + 'api/libro/pagination', req).subscribe((data) =>{
      this.bookPagination = data;
      this.bookPaginationSubject.next(this.bookPagination);
    });
  }

  obtenerActualListener(){
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Books) {
    this.http.post(this.baseUrl + 'api/libro', book).subscribe((response)=>{
      this.bookSubject.next(book);
    });
  }

  guardarLibroListener(){
    return this.bookSubject.asObservable();
  }
}
