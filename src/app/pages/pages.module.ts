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


@NgModule({
   declarations: [
     TasksComponent,
     PagesComponent,
     FormTaskComponent,
     NewTaskComponent,
     EditTaskComponent,
     ProjectComponent,
     ProjectFloorsComponent    

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
