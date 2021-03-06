import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Positions } from '../../interfaces/position.interface';
import { Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styles: []
})
export class NewPositionComponent implements OnInit {
  id: string;
  item: Positions;
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


  save(position: Positions) {
  
    this._ps.saveObject(Util.URL_POSITIONS,position).subscribe(
        res => {
          this._ps.refresToken(res);
          if( res.success == true ) {
            console.log(res.headers);            
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS ).subscribe(
              res => {
                if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
                  this.router.navigate(['/pages/positions']);  
        
                }
            }
            );      
          }           

        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }
 
}
