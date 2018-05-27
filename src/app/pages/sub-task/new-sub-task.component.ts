import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Location } from '@angular/common';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
@Component({
  selector: 'app-new-sub-task',
  templateUrl: './new-sub-task.component.html',
  styles: []
})
export class NewSubTaskComponent implements OnInit {

  id: string;
  item: SubTask;

  constructor(private location: Location,
              private _ps:ProviderService,
              private _msg: MsgBoxService,
              private router: Router) { 
    
    
    this._msg.notify.subscribe(
      res => {
        if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
          router.navigate(['/pages/subTasks']);  

        }
    });



  }


  ngOnInit() {

  }



  save(subTask:SubTask) {
    this.item = subTask;

    this._ps.saveObject(Util.URL_SUB_TASKS,subTask).subscribe(
        res => {
          this._ps.refresToken(res);        
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS );      
          }         
          
        }    
    );
     

  }
  
  back() {
    this.location.back();

  }
}
