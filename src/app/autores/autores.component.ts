import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationAutores } from './pagination-autores.model';
import { MatDialog } from '@angular/material/dialog';
import { AutoresNuevoComponent } from './Agregar/autores-nuevo/autores-nuevo.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, OnDestroy, AfterViewInit {
  timeOut: any = null;
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  private autorSuscription: Subscription | undefined;

  @ViewChild(MatSort) ordenamientoAutor?: MatSort;
  @ViewChild(MatPaginator) paginacionAutor?: MatPaginator;

  totalPersonas = 0;
  personasPorPagina = 5;
  paginaCombo = [5, 10, 20, 30];
  paginaActual = 1;
  sort = 'nombre';
  sortDirecction = 'asc';
  filterValue: { propiedad: string; valor: any } | null = null;

  constructor(
    private autoresService: AutoresService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.autoresService.obtenerAutores(
      this.personasPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirecction,
      this.filterValue
    );
    this.autorSuscription =  this.autoresService
      .ObtenerActualListener()
      .subscribe((pagination: PaginationAutores) => {
        this.dataSource = new MatTableDataSource<Autor>(pagination.data);
        this.totalPersonas = pagination.totalRow;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamientoAutor ?? null;
    this.dataSource.paginator = this.paginacionAutor ?? null;
  }

  eventoPaginadorAutor(event: PageEvent) {
    this.personasPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.autoresService.obtenerAutores(
      this.personasPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirecction,
      this.filterValue
    );
  }

  BuscarAutor(event: any) {
    clearTimeout(this.timeOut);
    const $this = this;

    this.timeOut = setTimeout(() => {
      if (event.Keycode !== 13) {
        const filterValueLocal = {
          propiedad: 'nombre',
          valor: event.target.value,
        };

        this.filterValue = filterValueLocal;

        this.autoresService.obtenerAutores(
          this.personasPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirecction,
          filterValueLocal
        );
      }
    }, 1000);
  }

  ordenarColumnasAutor(event: any) {
    this.sort = event.active;
    this.sortDirecction = event.direction;
    this.autoresService.obtenerAutores(
      this.personasPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  abrirDialogAutor() {
    const dialogRef = this.dialog.open(AutoresNuevoComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.autoresService.obtenerAutores(
        this.personasPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirecction,
        this.filterValue
      );
    });
  }

  ngOnDestroy() {
    this.autorSuscription?.unsubscribe();
  }
}
