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
  idTasks: string;
  idxSel: number;
  term: string;
  model: string;
  totalRecords: number;

  constructor(private _ps:ProviderService,
                      private router: Router,
                      private _msg: MsgBoxService) { 
    this.model = Util.URL_TASKS;                      

    this._ps.getObjects(Util.URL_TASKS).subscribe(
        res => {
           this.collection = res.tasks;
           this.totalRecords = res.totalRecords;  
        }

    );

    this._msg.notify.subscribe(
        res => {
            if(res.type === Util.ACTION_DELETE && res.response === Util.OK_RESPONSE ){
                              
                this._ps.deleteObject(Util.URL_TASKS,this.idTasks).subscribe(
                    res => {                                   
                        if(res.success == true) {
                            this._msg.show("", Util.MSJ_DELETE_SUCCESS, Util.ACTION_SUCCESS);                                            
                            this.collection.splice(this.idxSel,1);
                                                        
                        }
                    }
                ) 
            }
        }

    )



  }

  ngOnInit() {
  }


  edit(id: string) {
    
    this.router.navigate(['/editTask',id])

  }


  delete(idx:number ){
      this.idTasks = this.collection[idx]._id;
      this.idxSel = idx;
      this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE);

  }


  search() {
     if(this.term.length>0){
        this._ps.getObjects(Util.URL_TASKS, 0 ,this.term ).subscribe(
            res => {
                console.log(res);
                
                this.collection = res.tasks;
                this.totalRecords = res.totalRecords; 
            }   
        )       
    }else{
        this._ps.getObjects(Util.URL_TASKS).subscribe(
            res => {
               this.collection = res.tasks;
               this.totalRecords = res.totalRecords; 
            }
        );
    } 
  }
  



}


