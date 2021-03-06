import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styles: []
})
export class NewEmployeeComponent implements OnInit {

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


  save(employee: Employee) {
  
    this._ps.saveObject(Util.URL_EMPLOYEE,employee).subscribe(
        res => {
          this._ps.refresToken(res);
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS ).subscribe(
              res => {
                if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
                  this.router.navigate(['/pages/employees']);  
        
                }
            });       
          }          

        },err => {
          if(err.error.errors.errors.rut){
            this._msg.show(Util.ATENTION, err.error.errors.errors.rut.message, Util.ACTION_INFO ).subscribe(
              res => {
                if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
                  this.router.navigate(['/pages/newEmployee']);  
        
                }
            });
          }else{
            this._msg.show(Util.ATENTION, Util.GENERIC_ERROR_MSG, Util.ACTION_INFO ).subscribe(
              res => {
                if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
                  this.router.navigate(['/pages/newEmployee']);  
        
                }
            });
          }
             
       }    
    )

      

  }
  
  back() {
    this.location.back();

  }

}
