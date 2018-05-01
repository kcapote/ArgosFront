import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-position',
  templateUrl: './form-position.component.html',
  styles: []
})
export class FormPositionComponent implements OnInit {

  form: FormGroup;
  
  constructor() { }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required ),
      code: new FormControl('', Validators.required ),
      description: new FormControl(),
      performancePercentage: new FormControl('',[Validators.required, Validators.min(1), Validators.max(100)]) 

    })
      

  }

}
