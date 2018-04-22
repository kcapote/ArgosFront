import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { TasksComponent } from './tasks/tasks.component';
import { PagesComponent } from './pages.component';
import { FormTaskComponent } from './tasks/form-task.component';
import { NewTaskComponent } from './tasks/new-task.component';
import { NewSubtaskComponent } from './sub-task/new-subtask.component';
import { FormSubtaskComponent } from './sub-task/form-subtask.component';
import { EditSubtaskComponent } from './sub-task/edit-subtask.component';
import { EditTaskComponent } from './tasks/edit-task.component';


@NgModule({
   declarations: [
     TasksComponent,
     PagesComponent,
     FormTaskComponent,
     NewTaskComponent,
     NewSubtaskComponent,
     FormSubtaskComponent,
     NewSubtaskComponent,
     EditSubtaskComponent,
     EditTaskComponent    

   ],
   exports: [
      TasksComponent,
      PagesComponent,
      FormTaskComponent,
      NewTaskComponent,
      NewSubtaskComponent,
      FormSubtaskComponent,
      NewSubtaskComponent,
      EditSubtaskComponent,
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
