import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const app_routes: Routes = [
    {path: '**', component: PagenotfoundComponent}
    
]; 
    
export const APP_ROUTES = RouterModule.forRoot(app_routes);    

