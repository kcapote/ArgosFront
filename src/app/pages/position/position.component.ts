import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';
import { Util } from '../../util/util';
import { Positions } from '../../interfaces/position.interface';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: []
})
export class PositionComponent implements OnInit {
  title: string = "Cargos"
  collection: Positions[] = [];

  constructor(private _sp: ProviderService,
              private router: Router) { 
    
      _sp.getObjects(Util.URL_POSITIONS).subscribe(
          res => {
             this.collection = res.positions; 

          }
      )


  }

  ngOnInit() {
  }


  edit(id: string) {
    
    this.router.navigate(['/editPosition',id])

  }


}
