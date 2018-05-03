import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Positions } from '../../interfaces/position.interface';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styles: []
})
export class NewPositionComponent implements OnInit {

  constructor(private location: Location,
              private _ps:ProviderService) { }

  ngOnInit() {
  }


  save(position: Positions) {
  
    this._ps.saveObject(Util.URL_POSITIONS,position).subscribe(
        res => {
          console.log(res);         

        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }
 
}
