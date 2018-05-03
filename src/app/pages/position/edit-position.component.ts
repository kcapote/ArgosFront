import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { ActivatedRoute } from '@angular/router';
import { Positions } from '../../interfaces/position.interface';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styles: []
})
export class EditPositionComponent implements OnInit {

  idPosition: string;

  constructor(private activatedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private location: Location ) {
    
    this.activatedRoute.params.subscribe(
      p => {
        if(p['id']){
          this.idPosition = p['id'];         
        }
      }

    )

  }

  ngOnInit() {

  }

  save(position: Positions) {
    console.log('LA POSITION ES ', position);
    this._ps.updateObject(Util.URL_POSITIONS,this.idPosition ,position).subscribe(
        res => {
          console.log(res);         

        }    
    ) 

  }
  


  back() {
    this.location.back();

  }


}
