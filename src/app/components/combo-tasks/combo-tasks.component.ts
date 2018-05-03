import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Task } from '../../interfaces/task.interface';
import { Util } from '../../util/util';


@Component({
  selector: 'combo-tasks',
  templateUrl: './combo-tasks.component.html',
  styles: [],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboTasksComponent),
      multi: true
    }]
}) 
export class ComboTasksComponent implements OnInit, ControlValueAccessor {

  @Input() title:string = "Faenas"; 
  collection: Task[] = [];
  itemId:string; 
  
  constructor(private _ps: ProviderService) { 
    _ps.getObjects(Util.URL_TASKS).subscribe(
        res =>{
          this.collection = res.tasks;
          this.itemId = this.collection[0]._id; 
          this.propagateChange(this.itemId);
        }        
    );
    
  }
  
  onChange(value){
    this.itemId = value;
    this.propagateChange(this.itemId);
  }




  ngOnInit() {
  
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

  

  




}
