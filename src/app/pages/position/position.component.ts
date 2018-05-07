import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';
import { Util } from '../../util/util';
import { Positions } from '../../interfaces/position.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: []
})

export class PositionComponent implements OnInit {
  title: string = "Cargos"
  collection: Positions[] = [];
  id: string;
  idxSel: number;

  constructor(private _ps: ProviderService,
              private router: Router,
              private _msg: MsgBoxService) { 
    
      _ps.getObjects(Util.URL_POSITIONS).subscribe(
          res => {
             this.collection = res.positions; 

          }
      );

      this._msg.notify.subscribe(
        res => {
            if(res.type == Util.ACTION_DELETE && res.response == Util.OK_RESPONSE ){
                this._ps.deleteObject(Util.URL_POSITIONS,this.id).subscribe(
                    res => {                        
                        if(res.success == true) {
                            this._msg.show("", Util.MSJ_DELETE_SUCCESS, Util.ACTION_SUCCESS);                                            
                            this.collection.splice(this.idxSel,1); 
                        }
                    }
                )
            }
        }
    );



  }

  ngOnInit() {
  }


  edit(id: string) {
    
    this.router.navigate(['/editPosition',id])

  }

  delete(idx:number ){
    this.id = this.collection[idx]._id;
    this.idxSel = idx;
    this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE);

  }



}
