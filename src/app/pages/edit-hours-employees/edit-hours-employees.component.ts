import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ProviderService } from '../../services/provider.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';
import { Router } from '@angular/router';

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
  term: string;
  totalRecords: number;
  userTemp: any;

  constructor(
    private _msg: MsgBoxService,
    private _ps: ProviderService,
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

   }

  ngOnInit() {
    

  }


  delete (idx: number){
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
      res => {
        if(res.response == Util.OK_RESPONSE){
          this._ps.deleteObject(Util.URL_EMPLOYEE_SUBTASK,this.collection[idx]._id,0).subscribe(
            res=>{
              this.collection.splice(idx,1);
            } 
          )
        }
      }
    )

  } 

  saveOne (idx: number) {
    
   
    this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
      res => {
        if(res.response == Util.OK_RESPONSE){
            let a = this.collection[idx];
            if(Number(a.hoursWorked) > 24){              
              this._msg.show(Util.ATENTION, "No puede registrar más de 24 horas en un día",Util.ACTION_INFO).subscribe(
                res => {
                }
              )
            }else{
              this._ps.updateObject(Util.URL_EMPLOYEE_SUBTASK,a['_id'],a,0).subscribe(
                res => {
                  this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
                    res => {
                    }
                  )
                },
                err=> {
                  this._msg.show(Util.ATENTION, Util.GENERIC_ERROR_MSG,Util.ACTION_SUCCESS).subscribe(
                    res => {
                    }
                  )
                }
              )
            }
        }
      }
    );

  }

  saveAll () {


  }

  updateElement(idx: number, val) {
    this.collection[idx].hoursWorked = val;
  }

  loadData() {
   
    let urlTemp;
    
    if(this.fromDate && this.toDate){
      urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/employee/calendar/project/${ this.project['_id']}/${ this.fromDate }/${ this.toDate }`
    } else {
      urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/project/${ this.project['_id'] }` ;
    }
    
    this._ps.getObjects(Util.URL_EMPLOYEE_SUBTASK, 0).subscribe(
      res => {
        this.totalRecords = res.totalRecords;
        this.collection = res['employeeSubTasks'];
      }
    )    

  } 
}
