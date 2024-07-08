import { Component, OnInit } from '@angular/core';
import { AutoresService } from '../../autores.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-autores-nuevo',
  templateUrl: './autores-nuevo.component.html',
  styleUrls: ['./autores-nuevo.component.css'],
})
export class AutoresNuevoComponent implements OnInit {
  constructor(
    private autorService: AutoresService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {}

  guardarAutor(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: '',
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        gradoAcademico: form.value.gradoAcademico,
      };
      this.autorService.guardarAutor(autorRequest);
      this.autorService.guardarAutorListener().subscribe(()=>{
        this.dialogRef.closeAll();
      });
    }
  }
}
