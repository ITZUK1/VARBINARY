import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagenComponent } from './pages/components/imagen/imagen.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/imagen', pathMatch: 'full' }, 
  { path: 'imagen', component: ImagenComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
