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
  userTemp: any;

  constructor(private location: Location, private _ps:ProviderService,private activatedRoute: ActivatedRoute, private _msg: MsgBoxService, private router: Router ) { 
    
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
    
    activatedRoute.params.subscribe(
      p => {
          if(p['id']){
            this.idUser = p['id'];
          }  
        
      }
    );




  }

  ngOnInit() {
  }

  save(user: User) {
    this.item = user;     
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE).subscribe(
      res => {
        if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                    
          this._ps.updateObject(Util.URL_USER,this.idUser,this.item).subscribe(
            res => {
              this._ps.refresToken(res);                     
              if(res.success == true){
                   this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                   this.router.navigate(['/pages/user']);   
              }
            })           
        } 
    }
    );
  }
  
  back() {
    this.location.back()
  }

}
