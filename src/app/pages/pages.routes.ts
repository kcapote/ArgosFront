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
import { EditEmployeeComponent } from './employee/edit-employee.component';
import { FormProjectComponent } from './project/form-project.component';
import { ProjectCommonComponent } from './project/project-common.component';
import { ProjectEmployeesComponent } from './project/project-employees.component';
import { HomeComponent } from './home/home.component';
import { GanttDepartmentsComponent } from './gantt/gantt-departments.component';
import { GanttCommonServiceComponent } from './gantt/gantt-common-service.component';
import { GanttFloorsComponent } from './gantt/gantt-floors.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './user/new-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { EmployeeSubtaskComponent } from './employee-subtask/employee-subtask.component';
import { EditHoursEmployeesComponent } from './edit-hours-employees/edit-hours-employees.component';
import { UpdateProgressComponent } from './update-progress/update-progress.component';
import { GanttCommonDetailWorkedComponent } from './gantt/gantt-common-detail-worked.component';
import { LoginComponent } from '../login/login.component';

const app_pages_routes: Routes = [
    {path: 'pages', component: PagesComponent,
      children: [
        {path: 'tasks', component: TasksComponent},
        {path: 'newTask', component: NewTaskComponent},
        {path: 'projects', component: ProjectComponent },                    
        {path: 'newProjects', component: FormProjectComponent },
        {path: 'editProjects/:id', component: FormProjectComponent },
        {path: 'projectsFloors/:id', component: ProjectFloorsComponent },                    
        {path: 'editTask/:id', component: EditTaskComponent },
        {path: 'subTasks', component: SubTaskComponent },
        {path: 'newSubTask', component: NewSubTaskComponent },
        {path: 'editSubTask/:id', component: EditSubtaskComponent },
        {path: 'positions', component: PositionComponent },
        {path: 'newPosition', component: NewPositionComponent },
        {path: 'editPosition/:id', component: EditPositionComponent },
        {path: 'employees', component: EmployeeComponent },
        {path: 'newEmployee', component: NewEmployeeComponent },
        {path: 'editEmployee/:id', component: EditEmployeeComponent },
        {path: 'employees', component: EmployeeComponent },
        {path: 'projectsCommon/:id', component: ProjectCommonComponent },
        {path: 'projectEmployees/:id', component: ProjectEmployeesComponent },
        {path: 'assignTasks', component: AssignTasksComponent },
        {path: 'gantt/:id/:name', component: GanttFloorsComponent },
        {path: 'ganttDepartment/:idProyect/:idFloor/:idTask/:nameProject/:nameTask/:numberFloor', component: GanttDepartmentsComponent },
        {path: 'ganttCommonService/:idProyect/:idFloor/:idTask/:nameProject/:nameTask/:numberFloor/:type', component: GanttCommonServiceComponent },
        {path: 'ganttDetailCommonServices/:idProyect/:idFloor/:idTask/:idSubTask/:type', component: GanttCommonDetailWorkedComponent },
        {path: 'ganttDetailCommonServices/:idProyect/:idFloor/:idDepartment/:idTask/:idSubTask/:type', component: GanttCommonDetailWorkedComponent },
        {path: 'user', component: UserComponent },
        {path: 'newUser', component: NewUserComponent},
        {path: 'editUser/:id', component: EditUserComponent },
        {path: 'employeeSubTask', component: EmployeeSubtaskComponent },
        {path: 'editHours', component: EditHoursEmployeesComponent },
        {path: 'updateProgress', component: UpdateProgressComponent },
        {path: '', redirectTo: '/pages/home', pathMatch: 'full' },
        {path: 'login', component: LoginComponent },
        {path: 'home', component: HomeComponent },

        
        
    ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    



