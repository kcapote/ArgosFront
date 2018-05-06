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

  constructor(private location: Location,
              private _ps:ProviderService,
              private _msg: MsgBoxService,
              private router: Router) { }

  ngOnInit() {
  }


  save(task:Task) {
  
    this._ps.saveObject(Util.URL_TASKS,task).subscribe(
        res => {
          console.log(res);
          this._msg.show("",Util.SAVE_SUCCESS,Util.ACTION_SUCCES); 
          this.router.navigate(['/tasks']); 
  

        },error => {
          this._msg.show(Util.SAVE,error,Util.ACTION_INFO)  

        }     
    ) 

    
      

  }
  
  back() {
    this.location.back();

  }

}
