import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { SubTask } from '../../interfaces/subTask.interface';
import { Location } from '@angular/common';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';


@Component({
  selector: 'app-edit-subtask',
  templateUrl: './edit-subtask.component.html',
  styles: []
})
export class EditSubtaskComponent implements OnInit {

  idSubTask: string;
  subTask: SubTask;
  
  constructor(private activatedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private  location: Location,
              private _msg: MsgBoxService,
              private router: Router) {

    this.activatedRoute.params.subscribe(
        p => {
          if(p['id']){
            this.idSubTask = p['id'];
          }
        }

    );
    


  }

  ngOnInit() {
   
    
  }

  save(subTask:SubTask) {

    this.subTask = subTask;    
  
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE).subscribe(
      res => {
          
        if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                    
          this._ps.updateObject(Util.URL_SUB_TASKS,this.idSubTask,this.subTask).subscribe(
            res => {
              this._ps.refresToken(res);                    
              if(res.success == true){
                 
                   this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                   this.router.navigate(['/pages/subTasks']);   
              }
            })           
        } 
      }

    );

  }
  
  back() {
    this.location.back();

  }

}
