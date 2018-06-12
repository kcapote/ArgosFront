import { Component, OnInit } from '@angular/core';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { Util } from '../../util/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-progress',
  templateUrl: './update-progress.component.html',
  styles: []
})
export class UpdateProgressComponent implements OnInit {
  
  urlProjects: string = Util.URL_POJECTS; 
  form: FormGroup;
  
  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  );

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        project: new FormControl('',Validators.required),
        area: new FormControl('', Validators.required),
      }
    );

  

  }

}
