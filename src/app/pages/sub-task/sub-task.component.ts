import { Component, OnInit } from '@angular/core';
import { SubTask } from '../../interfaces/subTask.interface';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { URL_SUB_TASKS } from '../../services/config';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styles: []
})
export class SubTaskComponent implements OnInit {
  title: string = "Tareas";
  collection: SubTask[] = [];
  idSubTasks: string;
  idxSel: number;
  term: string;
  model: string = URL_SUB_TASKS;
  totalRecords: number;
  userTemp: any;

  constructor(private router: Router,
              private _ps: ProviderService,
              private _msg: MsgBoxService) { 
      
     let user = JSON.parse(localStorage.getItem('user'));
     this.userTemp = user;

      _ps.getObjects(Util.URL_SUB_TASKS).subscribe(
          res => {
            this._ps.refresToken(res);   
            this.collection = res.subTasks;
            this.totalRecords = res.totalRecords;
          }

      );

      this._msg.notify.subscribe(
        res => {
            if(res.type == Util.ACTION_DELETE && res.response == Util.OK_RESPONSE ){
                this._ps.deleteObject(Util.URL_SUB_TASKS,this.idSubTasks).subscribe(
                    res => {                        
                        this._ps.refresToken(res);
                        if(res.success == true) {
                            this._msg.show("", Util.MSJ_DELETE_SUCCESS, Util.ACTION_SUCCESS);                                            
                            this.collection.splice(this.idxSel,1); 
                        }
                    }
                )
            }
        }
    );

  }

  ngOnInit() {
  }

  
  edit(id: string) {
    
    this.router.navigate(['/pages/editSubTask',id])

  }

  
  delete(idx:number ){
    this.idSubTasks = this.collection[idx]._id;
    this.idxSel = idx;
    
    this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE);

  }

  //988830997
    
 search() {
    if(this.term.length>0){
       this._ps.getObjects(Util.URL_SUB_TASKS,0,this.term ).subscribe(
           res => {
               this._ps.refresToken(res);
               console.log(res);
               
               this.collection = res.subTasks;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._ps.getObjects(Util.URL_SUB_TASKS).subscribe(
           res => {
                this._ps.refresToken(res);  
                this.collection = res.subTasks;
                this.totalRecords = res.totalRecords;
           }
       );
   } 
 }   

}
