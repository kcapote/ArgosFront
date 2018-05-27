import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { User } from '../../interfaces/user.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: []
})
export class EditUserComponent implements OnInit {
  
  idUser: string;
  item: User; 

  constructor(private location: Location, private _ps:ProviderService,private activatedRoute: ActivatedRoute, private _msg: MsgBoxService, private router: Router ) { 
    activatedRoute.params.subscribe(
      p => {
          if(p['id']){
            this.idUser = p['id'];
          }  
        
      }
    );

    this._msg.notify.subscribe(
      res => {
          if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                      
            this._ps.updateObject(Util.URL_USER,this.idUser,this.item).subscribe(
              res => {
                this._ps.refresToken(res);                     
                if(res.success == true){
                     this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                     router.navigate(['/pages/user']);   
                }
              })           
          } 
      }
    );


  }

  ngOnInit() {
  }

  save(user: User) {
    this.item = user;     
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE);
  }
  
  back() {
    this.location.back()
  }

}
