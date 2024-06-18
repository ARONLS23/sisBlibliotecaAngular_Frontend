import { Component, OnInit, OnDestroy } from "@angular/core";
import { LibrosService } from "../services/libros.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html'
})

export class LibrosComponent implements OnInit, OnDestroy {

  libros: string[] = [];
  constructor(private librosService: LibrosService) { }
  private libroSubcription: Subscription = new Subscription();

  ngOnInit() {
    this.libros = this.librosService.obtenerLibros();
    this.libroSubcription = this.librosService.libroSubject.subscribe(() => {
      this.libros = this.librosService.obtenerLibros();
    });
  }

  eliminarlibro(libro: any) {

  }

  guardarLibro(f: any) {

    if (f.valid) {
      this.librosService.agregarLibros(f.value.nombreLibro);
    }

  }

  ngOnDestroy() {
    this.libroSubcription.unsubscribe();
  }

}
