import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { PagesComponent } from './pages.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task.component';
import { EditTaskComponent } from './tasks/edit-task.component';
import { ProjectComponent } from './project/project.component';
import { ProjectFloorsComponent } from './project/project-floors.component';
import { SubTaskComponent } from './sub-task/sub-task.component';
import { NewSubTaskComponent } from './sub-task/new-sub-task.component';
import { EditSubtaskComponent } from './sub-task/edit-subtask.component';


const app_pages_routes: Routes = [
    {path: '', component: PagesComponent,
      children: [
        {path: 'tasks', component: TasksComponent},
        {path: 'newTask', component: NewTaskComponent},
        {path: 'projects', component: ProjectComponent },                    
        {path: 'projectsFloors', component: ProjectFloorsComponent },                    
        {path: 'editTask/:id', component: EditTaskComponent },
        {path: 'subTasks', component: SubTaskComponent },
        {path: 'newSubTask', component: NewSubTaskComponent },
        {path: 'editSubTask/:id', component: EditSubtaskComponent },
        
    ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    



