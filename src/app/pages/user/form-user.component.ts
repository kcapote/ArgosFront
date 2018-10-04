import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Util } from '../../util/util';
import { User } from '../../interfaces/user.interface';
import { ValidTypesUser } from '../../enums/valid-types-user';
import { ProviderService } from '../../services/provider.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: []
})
export class FormUserComponent implements OnInit {

  @Input() title: string;
  @Input()  idUser: string;
  form: FormGroup;
  item: User;

  enumType = Object.keys(ValidTypesUser).map(
    r => {
      return ValidTypesUser[r]
    }
  ) ;

  constructor(private _ps: ProviderService) {

    this.form = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email]),
      role:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      password2:new FormControl()
    })

    this.form.controls['password2'].setValidators([
      this.passConfirmValid.bind(this.form)
    ])

   }

  ngOnInit() {
  }

  passConfirmValid(  control:FormControl ):{[s:string]:boolean} {
    let form:any = this;
    let pass1: string = form.controls['password'].value;
    let pass2: string = control.value;
    if(pass2!=pass1){
         return {
            passConfirmValid: false
        }
     }
    return null;
}



getUser(): User {
  this.item = this.form.value;
  if(this.idUser){
    this.item._id = this.idUser;
    delete this.item['password2'];
  }
    
  return this.item;
}



ngAfterViewInit() {
  if(this.idUser){
    this._ps.getObject(Util.URL_USER, this.idUser).subscribe(
        res => {
            this._ps.refresToken(res);
            this.item = res.users[0];
            this.form.setValue({
              _id: this.idUser,
              name: this.item.name,
              lastName: this.item.lastName,
              email: this.item.email,
              role: this.item.role,
              password:'',
              password2:''
            }) 
        })
    }
 }



}
