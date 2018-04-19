import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';
import { NewCategoriaComponent } from './categorias/new-categoria.component';


const app_pages_routes: Routes = [
    {path: '', component: PagesComponent,
      children: [
        {path: 'categorias', component: CategoriasComponent},
        {path: 'nuevaCategoria', component: NewCategoriaComponent }                    
        
    ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    



