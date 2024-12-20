import { Component } from '@angular/core';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css'],
})
export class ImagenComponent {
  imagenSeleccionada: File | null = null;
  imagenUrl: string | ArrayBuffer | null = null;
  imagenVistaUrl: string | null = null;

  constructor(private imagenService: ImagenService) {}

  // Función personalizada para convertir un string en número
  convertToNumber(value: string): number {
    return Number(value);
  }

  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  subirImagen(nombre: string) {
    if (this.imagenSeleccionada) {
      this.imagenService.subirImagen(nombre, this.imagenSeleccionada).subscribe({
        next: () => {
          alert('Imagen subida con éxito');
        },
        error: (err) => {
          console.error('Error al subir la imagen', err);
          alert('Hubo un error al subir la imagen');
        },
      });
    } else {
      alert('Selecciona una imagen antes de subirla');
    }
  }

  obtenerImagen(id: number) {
    this.imagenService.obtenerImagen(id).subscribe((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      this.imagenVistaUrl = url;
    });
  }
}

