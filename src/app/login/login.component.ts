import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { Router } from '@angular/router';
import { MsgBoxService } from '../components/msg-box/msg-box.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Util } from '../util/util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private _ps: ProviderService,
              private router: Router,
              private _msg: MsgBoxService) { }

  ngOnInit() {
    this.form = new FormGroup({
      mail: new FormControl('', Validators.required ),
      pass: new FormControl('', Validators.required ),
    })
  }

  public login(){
    let obj = {
      email: this.form.get('mail').value,
      password: this.form.get('pass').value,
    };
    this._ps.saveObject(Util.URL_LOGIN, obj).subscribe(
      res => {                    
        if(res.success == true){
            this._ps.refresToken(res);
            this.router.navigate(['/pages/home']);   
        }else{
             console.log(res);
        }
      }) 
  }

}
