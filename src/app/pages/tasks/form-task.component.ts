import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../../interfaces/task.interface';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';



@Component({ 
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styles: []
})
export class FormTaskComponent implements OnInit, AfterViewInit {
  
  @Input() idTask: string;  
  @Input() title: string = "Crear Categoría";
  
  
  form: FormGroup;
  item: Task;
  collection: SubTask[] = [];
  nameSubTask: string ="";

  enumType = Object.keys(ValidTypesTasks).map(
      r => {
        return ValidTypesTasks[r]
      }
  ) ;

  constructor(private _ps:ProviderService) { 

    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required)
    });
 
     console.log('el id es ', this.idTask);


   
    console.log(this.item);
    

  }
  
  
  

  ngOnInit() {
    
   }

   ngAfterViewInit() {
    console.log('el id afterasd', this.idTask);
    
   }
  
  addSubTask() {

    if(!this.nameSubTask){
      return
    }  

    let temp: SubTask = {
      name: this.nameSubTask,
    
    }
       
    this.collection.push(temp);
    this.nameSubTask = "";

  }


  deleteSubTask(idx: number) {
     this.collection.splice(idx, 1);
  }



 
  getTask():Task {
    this.item = this.form.value;
    this.item.subTask = this.collection;
    return this.item;   
  }




}
