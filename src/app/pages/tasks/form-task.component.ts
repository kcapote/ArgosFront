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
  //collection: SubTask[] = [];
  //nameSubTask: string ="";

  enumType = Object.keys(ValidTypesTasks).map(
      r => {
        return ValidTypesTasks[r]
      }
  ) ;

  constructor(private _ps:ProviderService) { 

    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'position': new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000) ])
    });
 
    

  }
  
  
  

  ngOnInit() {
    
  }

   ngAfterViewInit() {

    if(this.idTask){

      this._ps.getObject(Util.URL_TASKS, this.idTask).subscribe(
          res => {
              
              this.item = res.task;
              //this.collection = this.item.subTask;
              this.form.setValue({
                'name': this.item.name,
                'type': this.item.type,
                'position': this.item.position
                }
  
              )    
  
          }
          
      )
    }


    
   }




  // addSubTask() {

  //   if(!this.nameSubTask){
  //     return
  //   }  

  //   let temp: SubTask = {
  //     name: this.nameSubTask,
    
  //   }
       
  //   this.collection.push(temp);
  //   this.nameSubTask = "";

  // }


  // deleteSubTask(idx: number) {
  //    this.collection.splice(idx, 1);
  // }



 
  getTask():Task {
    
    this.item = this.form.value;
    
    if(this.idTask){
      this.item._id = this.idTask;
    }
    // this.item.subTask = this.collection;
    return this.item;   
  }




}
