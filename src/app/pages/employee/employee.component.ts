import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { Employee } from '../../interfaces/employee.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { URL_EMPLOYEE } from '../../services/config';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {
  
  title = "Empleados";  
  collection: Employee[] = []
  id: string;
  idxSel: number;
  term: string;
  model: string =  URL_EMPLOYEE;
  totalRecords: number; 
  userTemp: any; 

  constructor(private _ps:ProviderService,
              private router: Router,
              private _msg: MsgBoxService) {

    let user = JSON.parse(localStorage.getItem('user'));
    this.userTemp = user;

     this._ps.getObjectsByFather(Util.URL_EMPLOYEE,"recordActive",0,"true").subscribe(
        res => {
           this._ps.refresToken(res);
           this.collection = res.employees;
           this.totalRecords = res.totalRecords;         
        }
      );
      
      this._msg.notify.subscribe(
        res => {
            if(res.type == Util.ACTION_DELETE && res.response == Util.OK_RESPONSE ){
                this._ps.deleteObject(Util.URL_EMPLOYEE,this.id).subscribe(
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
    
    this.router.navigate(['/pages/editEmployee',id])

  }


  delete(idx:number ){
    this.id = this.collection[idx]._id;
    this.idxSel = idx;
    this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE);

  }

  search() {
    if(this.term.length>0){
       this._ps.getObjects(Util.URL_EMPLOYEE,0 ,this.term ).subscribe(
           res => {
               this._ps.refresToken(res);
               this.collection = res.employees;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._ps.getObjects(Util.URL_EMPLOYEE).subscribe(
           res => {
              this._ps.refresToken(res); 
              this.collection = res.employees;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
 }   

}
