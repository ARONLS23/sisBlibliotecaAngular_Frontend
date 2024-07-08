import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PaginationAutores } from './pagination-autores.model';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl;
  private autorLista: Autor[] = [];
  autoresSubject = new Subject<Autor[]>();
  autoresPaginationSubject = new Subject<PaginationAutores>();
  autoresPagination: PaginationAutores | undefined;


  /* obtenerAutores() {
    this.http
      .get<Autor[]>(this.baseUrl + 'api/LibreriaAutor')
      .subscribe((data) => {
        this.autorLista = data;
        this.autoresSubject.next([...this.autorLista]);
      });
  } */
  cargarComboAutor() {
    this.http
      .get<{ status: number; data: Autor[] }>(
        this.baseUrl + 'api/LibreriaAutor'
      )
      .subscribe({
        next: (dataResponse) => {
          console.log('Respuesta del servidor:', dataResponse);
          if (dataResponse.status === 200 && Array.isArray(dataResponse.data)) {
            this.autorLista = dataResponse.data;
            this.autoresSubject.next([...this.autorLista]);
          } else {
            console.error(
              'La respuesta del servidor no tiene el formato esperado:',
              dataResponse
            );
          }
        },
        error: (err) => {
          console.error('Error al obtener autores:', err);
        },
      });
  }

  cargarComboAutorListener() {
    return this.autoresSubject.asObservable();
  }

  obtenerAutores(
    autorPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirecction: string,
    filterValue: any
  ) {
    const req = {
      pageSize: autorPorPagina,
      page: paginaActual,
      sort,
      sortDirecction,
      filterValue,
    };
    this.http.post<PaginationAutores>(this.baseUrl + 'api/libreriaAutor/pagination', req).subscribe((data)=>{
      this.autoresPagination = data;
      this.autoresPaginationSubject.next(this.autoresPagination);
    });
  }
  ObtenerActualListener() {
    return this.autoresPaginationSubject.asObservable();
  }

  guardarAutor(autor: Autor){
    this.http.post(this.baseUrl + 'api/libreriaAutor', autor).subscribe((response)=>{
      this.autorLista.push(autor);
      this.autoresSubject.next([...this.autorLista]);
    });
  }

  guardarAutorListener(){
    return this.autoresSubject.asObservable();
  }
}
