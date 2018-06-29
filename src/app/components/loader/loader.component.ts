import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styles: []
})
export class LoaderComponent implements OnInit {
  
  constructor(public loader: LoaderService ) {

   }
  

  ngOnInit() {
  }

}
