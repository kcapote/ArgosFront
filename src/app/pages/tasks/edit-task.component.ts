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
  userTemp: any;

  constructor(private location: Location,
              private _ps:ProviderService,
              private activatedRoute:ActivatedRoute,
              private _msg: MsgBoxService,
              private router: Router ) {

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
    this.task = task;    
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE).subscribe(
      res => {
           
        if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
          
          this._ps.updateObject(Util.URL_TASKS,this.task._id,this.task).subscribe(
            res => {
              this._ps.refresToken(res);
              if(res.success == true){
                   this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                   this.router.navigate(['/pages/tasks']);   
              }          
                       
    
            }    
        )            
        } 
      
    }

    );

     

  }
  


  back() {
    this.location.back();

  }


}
