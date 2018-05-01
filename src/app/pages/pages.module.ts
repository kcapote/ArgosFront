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


@NgModule({
   declarations: [
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
     ComboSubTasksComponent         

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
        PAGES_ROUTES
   ],



})

export class PagesModule { }
