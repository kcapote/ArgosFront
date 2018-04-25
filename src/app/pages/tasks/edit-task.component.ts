import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Task } from '../../interfaces/task.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styles: []
})
export class EditTaskComponent implements OnInit {

  //itemTask: Task;
  idTask: string;

  constructor(private location: Location,
              private _ps:ProviderService,
              private activatedRoute:ActivatedRoute) {

      this.activatedRoute.params.subscribe(
          p =>{
            if(p['id']){
              this.idTask = p['id'];


            }

          }

      );

    
    

  }

  ngOnInit() {
  } 


  save(task:Task) {

    this._ps.updateObject(Util.URL_TASKS,task._id,task).subscribe(
        res => {
          console.log(res);         

        }    
    ) 

  }
  


  back() {
    this.location.back();

  }


}
