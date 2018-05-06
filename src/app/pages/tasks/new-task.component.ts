import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Task } from '../../interfaces/task.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styles: []
})
export class NewTaskComponent implements OnInit {
  
  idTask: string;
  task: Task;

  constructor(private location: Location,
              private _ps:ProviderService,
              private _msg: MsgBoxService,
              private router: Router) {

      this._msg.notify.subscribe(
        res => {
          if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
              router.navigate(['/tasks']);

          }
      })


  }

  ngOnInit() {
  }


  save(task:Task) {
    this.task = task;    
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE);

    this._ps.saveObject(Util.URL_TASKS,task).subscribe(
        res => {
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS );      
          }
        },error => {
          this._msg.show(Util.ERROR,error,Util.ACTION_INFO)  

        }     
    ) 

    
      

  }
  
  back() {
    this.location.back();

  }

}
