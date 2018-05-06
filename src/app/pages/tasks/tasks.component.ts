import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  title = "Faenas";  
  collection: Task[] = []

  constructor(private _sp:ProviderService,
                      private router: Router,
                      private _msg: MsgBoxService) { 

    this._sp.getObjects(Util.URL_TASKS).subscribe(
        res => {
           this.collection = res.tasks;
         
        }

    );

    this._msg.notify.subscribe(
        res => {
            if(res.type == Util.ACTION_DELETE && res.response == Util.ok ){
                console.log(res);
                        

            }
            

        }

    )

  }

  ngOnInit() {
  }


  edit(id: string) {
    
    this.router.navigate(['/editTask',id])

  }


  delete(){
      this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE);

  }


 
}
