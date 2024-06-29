import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BooksNuevoComponent } from './Agregar/books-nuevo/books-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeOut: any = null;
  bookData: Books[] = [];
  desplegarColumnas: string[] = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento?: MatSort;
  @ViewChild(MatPaginator) paginacion?: MatPaginator;

  private bookSuscription: Subscription | undefined;

  totalLibros = 0;
  librosPorPagina = 5;
  paginaCombo = [5, 10, 20, 30];
  paginaActual = 1;
  sort = 'titulo';
  sortDirecction = 'asc';
  filterValue: { propiedad: string; valor: any } | null = null;

  constructor(private bookService: BooksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirecction,
      this.filterValue
    );
    this.bookSuscription =  this.bookService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRow;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento ?? null;
    this.dataSource.paginator = this.paginacion ?? null;
  }

  Buscar(event: any) {
    clearTimeout(this.timeOut);
    const $this = this;

    this.timeOut = setTimeout(() => {
      if (event.Keycode !== 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };

        this.filterValue = filterValueLocal;

        $this.bookService.obtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirecction,
          filterValueLocal
        );
      }
    }, 1000);
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(BooksNuevoComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.bookService.obtenerLibros(
        this.librosPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirecction,
        this.filterValue
      );
    });
  }

  eventoPaginador(event: PageEvent) {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirecction,
      this.filterValue
    );
  }

  ordenarColumnas(event: any) {
    this.sort = event.active;
    this.sortDirecction = event.direction;
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  ngOnDestroy() {
    this.bookSuscription?.unsubscribe();
  }
}
