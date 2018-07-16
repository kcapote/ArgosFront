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
  userTemp: any;

  constructor(private location: Location,
              private _ps:ProviderService,
              private _msg: MsgBoxService,
              private router: Router) { 
    
                let user = JSON.parse(localStorage.getItem('user'));
                this._ps.getObject(Util.URL_USER,user._id).subscribe(
                    res => { 
                        this._ps.refresToken(res);                                           
                        this.userTemp = res.users[0];
                        if(user.role != this.userTemp.role){
                            localStorage.setItem('user','');
                            this.router.navigate(['login'])
                        }
                    }
                )
    

  }


  ngOnInit() {

  }



  save(subTask:SubTask) {
    this.item = subTask;

    this._ps.saveObject(Util.URL_SUB_TASKS,subTask).subscribe(
        res => {
          this._ps.refresToken(res);        
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS ).subscribe(
              res => {
                if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
                  this.router.navigate(['/pages/subTasks']);  
        
                }
            }
            );      
          }         
          
        }    
    );
     

  }
  
  back() {
    this.location.back();

  }
}
