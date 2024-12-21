import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertasComponent } from "../app/ofertas/ofertas.component";
import { LoginComponent } from "./login/login.component";
import { PagePrincipalComponent } from "./page-principal/page-principal.component";


import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NosotrosComponent } from './nosotros/nosotros.component';


const routes: Routes = [
  {path:'',component:PagePrincipalComponent},
  {path:'pagePrincipal',component:PagePrincipalComponent},
  {path:'oferta',component:OfertasComponent},
  {path:'sesion', component:LoginComponent},
  {path:'productos', component:ProductosComponent}, 
  {path:'contacto', component:ContactoComponent}, 
  {path:'nosotros', component:NosotrosComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
