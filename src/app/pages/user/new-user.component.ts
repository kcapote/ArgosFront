import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Util } from '../../util/util';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: []
})
export class NewUserComponent implements OnInit {

  constructor(private location: Location,private _ps:ProviderService,private _msg: MsgBoxService,private router: Router) {
    this._msg.notify.subscribe(
      res => {
        if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
          router.navigate(['/pages/user']);  

        }
    });  
  }

  ngOnInit() {
  }

  save(user: User) {
    this._ps.saveObject(Util.URL_USER,user).subscribe(
        res => {
          this._ps.refresToken(res);
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS );      
          }          
        }    
    ) 
  }

  back() {
    this.location.back();
  }


}
