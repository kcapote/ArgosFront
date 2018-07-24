import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidTypesSex } from '../../enums/valid-types-sexs.enum';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styles: []
})

export class FormEmployeeComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input()  idEmployee: string;
  form: FormGroup;
  urlCombo = Util.URL_POSITIONS;
  item: Employee;

  enumType = Object.keys(ValidTypesSex).map(
    r => {
      return ValidTypesSex[r]
    }
  ) ;

  constructor(private _ps: ProviderService,
              private router: Router) { 


    let user = JSON.parse(localStorage.getItem('user'));
    this._ps.getObject(Util.URL_USER,user._id).subscribe(
        res => { 
            this._ps.refresToken(res);                                           
            let userTemp = res.users[0];
            if(user.role != userTemp.role){
                localStorage.setItem('user','');
                this.router.navigate(['login'])
            }
        }
    )


  }

  ngOnInit() {

  
    this.form = new FormGroup({
      _id: new FormControl(''),
      rut: new FormControl('', [Validators.required, Util.rutValid] ),
      name: new FormControl('', Validators.required),
      //lastName: new FormControl(''),
      phone: new FormControl(''),
      mail: new FormControl(''),
      position:new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      contractStartDate:new FormControl('', Validators.required),
      contractEndDate:new FormControl(''),
      address:new FormControl('') 


    })


  }


  getEmployee(): Employee {
    this.item = this.form.value;
    if(this.idEmployee){
      this.item._id = this.idEmployee;
      
    }
      
    return this.item;
  }

  formatRut() {
    this.form.get('rut').setValue( Util.formatRut( this.form.get('rut').value ) )

  }


  ngAfterViewInit() {
  
    if(this.idEmployee){

      this._ps.getObject(Util.URL_EMPLOYEE, this.idEmployee).subscribe(
          res => {
              this._ps.refresToken(res);
              this.item = res.employees[0];
              //this.collection = this.item.subTask;
              this.form.setValue({
                _id: this.idEmployee,
                rut: this.item.rut,
                name: this.item.name,
                //lastName: this.item.lastName,
                phone: this.item.phone,
                mail: this.item.mail,
                position: this.item.position['_id'],
                sex: this.item.sex,
                contractStartDate: this.item.contractStartDate.toString().substr(0,10) ,
                contractEndDate: this.item.contractEndDate?this.item.contractEndDate.toString().substr(0,10):null,
                address: this.item.address?this.item.address:"", 
              }
  
              )    
  
          }
          
      )
    }

   }



}
