import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagenComponent } from './imagen/imagen.component'; // Cambia esta importación si tienes otro componente

const routes: Routes = [
  { path: '', redirectTo: '/imagen', pathMatch: 'full' }, // Redirige a la ruta principal
  { path: 'imagen', component: ImagenComponent }, // Ruta para el componente de imagen
  // Agrega más rutas si tienes más componentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
