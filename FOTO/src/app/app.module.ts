import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ImagenComponent } from './pages/components/imagen/imagen.component';
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de importar este módulo

@NgModule({
  declarations: [
    AppComponent,
    ImagenComponent, // Asegúrate de declarar tus componentes aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // Asegúrate de agregar el módulo de rutas aquí
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
