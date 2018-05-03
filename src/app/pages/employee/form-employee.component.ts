import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidTypesSex } from '../../enums/valid-types-sexs.enum';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styles: []
})
export class FormEmployeeComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {

  
    this.form = new FormGroup({
      id: new FormControl(''),
      rut: new FormControl('', [Validators.required, Util.rutValid] ),
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      mail: new FormControl('', [Validators.required, Validators.email]),
      position:new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      contractStartDate:new FormControl('', Validators.required),
      contractEndDate:new FormControl('') 

    })


  }


  getEmployee(): Employee {
    this.item = this.form.value;
    if(this.idEmployee){
      this.item._id = this.idEmployee;
      
    }
    console.log(this.item);
      
    return this.item;
  }

  formatRut() {
    this.form.get('rut').setValue( Util.formatRut( this.form.get('rut').value ) )

  }




}
