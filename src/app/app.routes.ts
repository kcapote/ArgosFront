import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';

const app_routes: Routes = [
    
    {path: 'login', component: LoginComponent },
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: '**', component: PagenotfoundComponent}
    
]; 
    
export const APP_ROUTES = RouterModule.forRoot(app_routes);    

