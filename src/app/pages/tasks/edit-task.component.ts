import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Task } from '../../interfaces/task.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styles: []
})
export class EditTaskComponent implements OnInit {

  //itemTask: Task;
  idTask: string;
  task: Task;

  constructor(private location: Location,
              private _ps:ProviderService,
              private activatedRoute:ActivatedRoute,
              private _msg: MsgBoxService,
              private router: Router ) {

      this.activatedRoute.params.subscribe(
          p =>{
            if(p['id']){
              this.idTask = p['id'];
              
            }

          }

      );

    this._msg.notify.subscribe(
        res => {
           
            if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
              
              this._ps.updateObject(Util.URL_TASKS,this.task._id,this.task).subscribe(
                res => {
                  if(res.success == true){
                       this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                       router.navigate(['/tasks']);   
                  }          
                           
        
                }    
            )            
            } 
          
        }
    )
    

  }

  ngOnInit() {
  } 


  save(task:Task) {
    this.task = task;    
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE);

     

  }
  


  back() {
    this.location.back();

  }


}
