import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-form-subtask',
  templateUrl: './form-subtask.component.html',
  styles: []
})
export class FormSubtaskComponent implements OnInit, AfterViewInit {
  
  form: FormGroup;
  subTask: SubTask;

  @Input() idSubTask: string;
  @Input() title: string ="";

  constructor(private _ps: ProviderService) { 
       
  }

  ngOnInit() {
    this.form =  new FormGroup({
      'name': new FormControl('',Validators.required),
      'task': new FormControl('',Validators.required),
      'position': new FormControl('',[Validators.required, Validators.max(1000), Validators.min(1)])

    })


  }


  getSubTask(): SubTask{
      
      this.subTask = this.form.value;
      return this.subTask;

  }


  ngAfterViewInit() {
    console.log(this.idSubTask);
    
      if(this.idSubTask){
        this._ps.getObject(Util.URL_SUB_TASKS, this.idSubTask).subscribe(
            res => {
                  
                this.subTask = res.subTasks[0];
                this.form.setValue(
                    {
                      'name': this.subTask.name,
                      'task': this.subTask.task._id,
                      'position': this.subTask.position

                    }

                )
     

            }
          
        )
      }

  }

}
