import { Subject } from "rxjs";
export class LibrosService {

  libroSubject = new Subject<void>();

  private libros = ['Libro 1', 'Libro 2', 'Libro 3'];

  agregarLibros(libroNombre: string) {
    this.libros.push(libroNombre);
    this.libroSubject.next();
  }

  obtenerLibros() {
    return [...this.libros];
  }

  eliminarLibro(libroNombre: string){
    this.libros = this.libros.filter(x => x !== libroNombre);
    this.libroSubject.next();
  }
}
