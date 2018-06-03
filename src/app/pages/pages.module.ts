import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { TasksComponent } from './tasks/tasks.component';
import { PagesComponent } from './pages.component';
import { FormTaskComponent } from './tasks/form-task.component';
import { NewTaskComponent } from './tasks/new-task.component';
import { EditTaskComponent } from './tasks/edit-task.component';
import { ProjectComponent } from './project/project.component';
import { ProjectFloorsComponent } from './project/project-floors.component';
import { SubTaskComponent } from './sub-task/sub-task.component';
import { NewSubTaskComponent } from './sub-task/new-sub-task.component';
import { ComboTasksComponent } from '../components/combo-tasks/combo-tasks.component';
import { FormSubtaskComponent } from './sub-task/form-subtask.component';
import { EditSubtaskComponent } from './sub-task/edit-subtask.component';
import { ComboSubTasksComponent } from '../components/combo-sub-tasks/combo-sub-tasks.component';
import { EmployeeComponent } from './employee/employee.component';
import { PositionComponent } from './position/position.component';
import { FormPositionComponent } from './position/form-position.component';
import { NewPositionComponent } from './position/new-position.component';
import { EditPositionComponent } from './position/edit-position.component';
import { ComboComponent } from '../components/combo/combo.component';
import { FormEmployeeComponent } from './employee/form-employee.component';
import { NewEmployeeComponent } from './employee/new-employee.component';
import { FormatRutPipe } from '../pipes/format-rut.pipe';
import { EditEmployeeComponent } from './employee/edit-employee.component';
import { FormProjectComponent } from './project/form-project.component';
import { MsgBoxComponent } from '../components/msg-box/msg-box.component';
import { MsgBoxService } from '../components/msg-box/msg-box.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCommonComponent } from './project/project-common.component';
import { ProjectEmployeesComponent } from './project/project-employees.component';
import { HomeComponent } from './home/home.component';
import { GanttDepartmentsComponent } from './gantt/gantt-departments.component';
import { GanttFloorsComponent } from './gantt/gantt-floors.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './user/new-user.component';
import { FormUserComponent } from './user/form-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { EmployeeSubtaskComponent } from './employee-subtask/employee-subtask.component';
import { EditHoursEmployeesComponent } from './edit-hours-employees/edit-hours-employees.component';


@NgModule({
   declarations: [
     NavbarComponent,        
     TasksComponent,
     PagesComponent,
     FormTaskComponent,
     NewTaskComponent,
     EditTaskComponent,
     ProjectComponent,
     ProjectFloorsComponent,
     SubTaskComponent,
     NewSubTaskComponent,
     ComboTasksComponent,
     FormSubtaskComponent,
     EditSubtaskComponent,
     ComboSubTasksComponent,
     EmployeeComponent,
     PositionComponent,
     FormPositionComponent,
     NewPositionComponent,
     EditPositionComponent,
     ComboComponent,
     FormEmployeeComponent,
     NewEmployeeComponent,
     FormatRutPipe,
     EditEmployeeComponent,
     FormProjectComponent,
     //MsgBoxComponent,
     PaginationComponent,
     ProjectCommonComponent,
     ProjectEmployeesComponent,
     HomeComponent,
     GanttDepartmentsComponent,
     GanttFloorsComponent,
     AssignTasksComponent,
     UserComponent,
     NewUserComponent,
     FormUserComponent,
     EditUserComponent,
     EmployeeSubtaskComponent,
     EditHoursEmployeesComponent

   ],
   exports: [ 
      TasksComponent,
      PagesComponent,
      FormTaskComponent,
      NewTaskComponent,
      EditTaskComponent      

   ],
   imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,  
        PAGES_ROUTES,
        HttpClientModule
   ],
   providers: [
     // MsgBoxService

   ]



})

export class PagesModule { }
