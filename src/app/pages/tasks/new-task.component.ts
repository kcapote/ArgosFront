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


  save(task:Task) {
    this.task = task;    
    
    this._ps.saveObject(Util.URL_TASKS,task).subscribe(
        res => {
          this._ps.refresToken(res);
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS ).subscribe(
              res => {
                if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
                    this.router.navigate(['/pages/tasks']);
      
                }
            }
            );      
          }
        }  
    ) 

    
      

  }
  
  back() {
    this.location.back();

  }

}
