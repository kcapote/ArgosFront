import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SubTask } from '../../interfaces/subTask.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'combo-sub-tasks',
  templateUrl: './combo-sub-tasks.component.html',
  styles: [],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboSubTasksComponent),
      multi: true
    }]
})
export class ComboSubTasksComponent implements OnInit, ControlValueAccessor {

  @Input() title:string = "Tareas"; 
  @Input() idTask:string;

  collection: SubTask[] = [];
  itemId:string; 

  constructor(private _ps: ProviderService ) { 
      
  }

  ngOnInit() {
    console.log('el id sub es', this.idTask);
      

      if(this.idTask) {
        let url = `${ Util.URL_SUB_TASKS }/task/${ this.idTask }`;
        
        this._ps.getObjects( url ).subscribe(
          res => {
            this._ps.refresToken(res); 
            this.collection = res.subTasks;
            this.itemId = this.collection[0]._id;
            this.propagateChange(this.itemId)
          }
        )
      } 
  } 

  writeValue(obj: any): void {
    //throw new Error("Method not implemented.");
  }
  registerOnChange(fn): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    //throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error("Method not implemented.");
  }
  
  private propagateChange = (_: any) => { };


  onChange( value ){
    this.itemId = value;
    this.propagateChange( this.itemId );
  }
  

}
