import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';
import { MsgBoxService } from '../msg-box/msg-box.service';
import { Util } from '../../util/util';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  form: FormGroup;
  
  constructor(private _ps: ProviderService,
    private router: Router,
    private _msg: MsgBoxService) { }

  ngOnInit() {
  }


  public logon(){

    let user = JSON.parse(localStorage.getItem('user'));
    

    this._ps.getObject(Util.URL_LOGON, user._id).subscribe(
      res => {                    
        if(res.success == true){
            localStorage.setItem('user','');
            this.router.navigate(['/login']);   
        }else{
          localStorage.setItem('user','');
          this.router.navigate(['/login']);   
        }
      }) 
  }
}
