import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';


const app_pages_routes: Routes = [
    {path: '', component: PagesComponent,
      children: [
        {path: 'categorias', component: CategoriasComponent} ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    

