import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { Floors } from '../../interfaces/floors.interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {

  @Input() title = "Crear Proyecto";
  
  quantitySel: number;
  typeSel: string;

  form: FormGroup;
  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  ) ;
  collection: Floors[] = [];

  constructor( private router: Router) { }


  ngOnInit() {
  }

  addPisos(type: string, quantity: number) {
        let temp: Floors = {
          quantity: quantity,
          type: type
        };     

        this.collection.push(temp);

  }


  goToContinue() {
    
    console.log('asdasd');
    
    this.router.navigate(['/projectsFloors']);


  }
 

}
