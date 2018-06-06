import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ProviderService } from '../../services/provider.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';

@Component({
  selector: 'app-edit-hours-employees',
  templateUrl: './edit-hours-employees.component.html',
  styles: []
})
export class EditHoursEmployeesComponent implements OnInit {
  
  urlEmployyeeSub = Util.URL_EMPLOYEE_SUBTASK;
  urlProjects = Util.URL_POJECTS;
  collection:EmployeeSubTask [] = [];
  project: any = {};
  fromDate: string; 
  toDate: string;

  constructor(
    private _msg: MsgBoxService,
    private _ps: ProviderService ) {


   }

  ngOnInit() {
    

  }


  delete (idx: number){
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
      res => {
        if(res.response == Util.OK_RESPONSE){
          this._ps.deleteObject(Util.URL_EMPLOYEE_SUBTASK,this.collection[idx]._id,0).subscribe(
            res=>{
              console.log('delete success');
              this.collection.splice(idx,1);
            } 
          )
        }
      }
    )

  } 

  saveOne (idx: number) {
    
    console.log(this.collection[idx]);
    
    this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
      res => {
        if(res.response == Util.OK_RESPONSE){
            let a = this.collection[idx];
            this._ps.updateObject(Util.URL_EMPLOYEE_SUBTASK,a['_id'],a,0).subscribe(
              res => {
                console.log('update succes');
                
              }
            )

        }
      }
    )

  }

  saveAll () {


  }

  updateElement(idx: number, val) {
    this.collection[idx].hoursWorked = val;
   
    
  }

  loadData() {
   
    console.log(this.fromDate);
    let urlTemp;
    
    if(this.fromDate && this.toDate){
      urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/employee/calendar/${ this.project['_id']}/${ this.fromDate }/${ this.toDate }`
    } else {
      urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/project/${ this.project['_id'] }` ;
    }
    
    this._ps.getObjectsAny(urlTemp,0).subscribe(
      res => {
        console.log(res);
        this.collection = res['employeeSubTasks'];
      }
    )    

  } 
}
