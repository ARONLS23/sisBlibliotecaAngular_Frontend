import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BooksService } from '../../books.service';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from 'src/app/autores/autor.model';
import { AutoresService } from 'src/app/autores/autores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-nuevo',
  templateUrl: './books-nuevo.component.html',
  styleUrls: ['./books-nuevo.component.css'],
})
export class BooksNuevoComponent implements OnInit, OnDestroy {
  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  selectAutor: string | undefined;
  selectAutorTexto: string | undefined;
  fechaPublicacion: string | undefined;
  @ViewChild(MatDatepicker) picker?: MatDatepicker<Date>;

  autores: Autor[] = [];
  autorSucription: Subscription | undefined;

  ngOnInit() {
    this.autoresService.cargarComboAutor();
    this.autorSucription = this.autoresService
      .cargarComboAutorListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor ?? '',
        nombreCompleto: this.selectAutorTexto ?? '',
      };
      const libroRequest = {
        id: '',
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion ?? ''), //Manejo del caso undefined
      };
      this.bookService.guardarLibro(libroRequest);
      this.autorSucription = this.bookService
        .guardarLibroListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  ngOnDestroy() {
    this.autorSucription?.unsubscribe();
  }
}
