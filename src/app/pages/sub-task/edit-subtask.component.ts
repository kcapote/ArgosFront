import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { SubTask } from '../../interfaces/subTask.interface';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-subtask',
  templateUrl: './edit-subtask.component.html',
  styles: []
})
export class EditSubtaskComponent implements OnInit {

  idSubTask: string;

  constructor(private activatedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private  location: Location) {
    this.activatedRoute.params.subscribe(
        p => {
          if(p['id']){
            this.idSubTask = p['id'];
          }
        }

    ) 
  }

  ngOnInit() {
   
    
  }

  save(subTask:SubTask) {

    this._ps.updateObject(Util.URL_SUB_TASKS,this.idSubTask,subTask).subscribe(
        res => {        
          console.log(res);
          
        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }

}
