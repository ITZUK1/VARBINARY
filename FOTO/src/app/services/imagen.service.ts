// imagen.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  private apiUrl = 'http://localhost:5000'; // Asegúrate de que la URL esté correcta

  constructor(private http: HttpClient) {}

  // Método para subir la imagen
  subirImagen(nombre: string, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('imagen', imagen, imagen.name);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Método para obtener la imagen por ID
  obtenerImagen(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/imagen/${id}`, { responseType: 'blob' });
  }
}
