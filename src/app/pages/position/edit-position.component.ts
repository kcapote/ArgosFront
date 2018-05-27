import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { ActivatedRoute, Router } from '@angular/router';
import { Positions } from '../../interfaces/position.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styles: []
})
export class EditPositionComponent implements OnInit {

  idPosition: string;
  item: Positions; 
  
  constructor(private activatedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private location: Location,
              private _msg: MsgBoxService,
              private router: Router ) {
    
    this.activatedRoute.params.subscribe(
      p => {
        if(p['id']){
          this.idPosition = p['id'];         
        }
      }

    );

    this._msg.notify.subscribe(
      res => {
          
          if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                      
            this._ps.updateObject(Util.URL_POSITIONS,this.idPosition,this.item).subscribe(
              res => {                    
                this._ps.refresToken(res);
                if(res.success == true){
                     this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                     router.navigate(['/pages/positions']);   
                }
              })           
          } 
      }
    );

  }

  ngOnInit() {

  }

  save(position: Positions) {
    this.item = position;     
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE);

  }
  


  back() {
    this.location.back();

  }


}
