import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Positions } from '../../interfaces/position.interface';

@Component({
  selector: 'app-form-position',
  templateUrl: './form-position.component.html',
  styles: []
})
export class FormPositionComponent implements OnInit {

  form: FormGroup;
  @Input() idPosition;
  @Input() title = "Nuevo Cargo";
  item: Positions;

  constructor(private _ps: ProviderService) { 
    
    

  }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required ),
      code: new FormControl('', Validators.required ),
      description: new FormControl(),
      performancePercentage: new FormControl('',[Validators.required, Validators.min(1), Validators.max(100)]) 

    })
      

  }



  getPosition(): Positions {

    this.item = this.form.value;
    
    if(this.idPosition) {
        this.item.id_ = this.idPosition;
        
    }


    return this.item;

  }

  ngAfterViewInit() {

    console.log(this.idPosition);



      if(this.idPosition){
        this._ps.getObject(Util.URL_POSITIONS, this.idPosition).subscribe(
            res =>{
              console.log(res);
              this.item = res.position;
              this.item['_id'] = this.idPosition; 
              this.form.setValue({
                  name: this.item.name,
                  code: this.item.code,
                  description: this.item.description,
                  performancePercentage: this.item.performancePercentage                  

              });


            }
        )
  
      }


    //   this._ps.getObject(Util.URL_TASKS, this.idTask).subscribe(
    //       res => {
              
    //           this.item = res.task;
    //           //this.collection = this.item.subTask;
    //           this.form.setValue({
    //             'name': this.item.name,
    //             'type': this.item.type,
    //             'position': this.item.position
    //             }
  
    //           )    
  
    //       }
          
    //   )
    // }

   }


}
