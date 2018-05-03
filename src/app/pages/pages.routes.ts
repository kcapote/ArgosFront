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
import { PositionComponent } from './position/position.component';
import { NewPositionComponent } from './position/new-position.component';
import { EditPositionComponent } from './position/edit-position.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormEmployeeComponent } from './employee/form-employee.component';
import { NewEmployeeComponent } from './employee/new-employee.component';


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
        {path: 'positions', component: PositionComponent },
        {path: 'newPosition', component: NewPositionComponent },
        {path: 'editPosition/:id', component: EditPositionComponent },
        {path: 'employees', component: EmployeeComponent },
        {path: 'newEmployee', component: NewEmployeeComponent },
        {path: 'employees', component: EmployeeComponent },

        
        
    ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    



