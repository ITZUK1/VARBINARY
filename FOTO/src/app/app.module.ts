import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ImagenComponent } from './pages/components/imagen/imagen.component';
import { AppRoutingModule } from './app-routing.module'; 

@NgModule({
  declarations: [
    AppComponent,
    ImagenComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
