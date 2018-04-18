import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';

@NgModule({
   declarations: [
     CategoriasComponent,
     PagesComponent
   ],
   exports: [
      CategoriasComponent,
      PagesComponent
   ],
   imports: [
        PAGES_ROUTES
   ]


})

export class PagesModule { }
