import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';
import { FormCategoriasComponent } from './categorias/form-categorias.component';
import { NewCategoriaComponent } from './categorias/new-categoria.component';

@NgModule({
   declarations: [
     CategoriasComponent,
     PagesComponent,
     FormCategoriasComponent,
     NewCategoriaComponent
   ],
   exports: [
      CategoriasComponent,
      PagesComponent,
      FormCategoriasComponent,
      NewCategoriaComponent
   ],
   imports: [
        PAGES_ROUTES
   ]


})

export class PagesModule { }
