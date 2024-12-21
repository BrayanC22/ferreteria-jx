import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagePrincipalComponent } from './page-principal/page-principal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { OfertasComponent } from './ofertas/ofertas.component';
import {MatTableModule} from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { ContactoComponent } from './contacto/contacto.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule



@NgModule({
  declarations: [
    AppComponent,
    PagePrincipalComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    OfertasComponent,
    ContactoComponent,
    NosotrosComponent,
    ProductosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatFormFieldModule,ReactiveFormsModule,MatCardModule,MatInputModule,MatSnackBarModule,MatToolbarModule,MatIconModule,MatDialogModule,MatChipsModule,MatButtonModule,
    BrowserAnimationsModule,HttpClientModule,MatTableModule,FormsModule

  ],
  entryComponents: [LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
