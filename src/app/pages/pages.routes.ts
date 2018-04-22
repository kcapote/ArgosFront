import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { PagesComponent } from './pages.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task.component';
import { NewSubtaskComponent } from './sub-task/new-subtask.component';
import { EditTaskComponent } from './tasks/edit-task.component';


const app_pages_routes: Routes = [
    {path: '', component: PagesComponent,
      children: [
        {path: 'tasks', component: TasksComponent},
        {path: 'newTask', component: NewTaskComponent },                    
        {path: 'editTask/:id', component: EditTaskComponent },
        
    ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    



