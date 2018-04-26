import { Component, OnInit } from '@angular/core';
import { Floors } from '../../interfaces/floors.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-project-floors',
  templateUrl: './project-floors.component.html',
  styles: []
})
export class ProjectFloorsComponent implements OnInit {

  constructor() { }

  collection: Floors[] = [];

  ngOnInit() {
      for (let index = 0; index < 10; index++) {
        let item: Floors={
          quantity: 12,
          type: Validators['PISOS']
        }

        this.collection.push(item)
;        
      }
      
  }

}
