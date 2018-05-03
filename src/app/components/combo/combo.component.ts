import { Component, OnInit, forwardRef, Input, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';

@Component({
  selector: 'combo',
  templateUrl: './combo.component.html',
  styles: [],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboComponent),
      multi: true
    }]
})
export class ComboComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input() title:string = ""; 
  @Input() url;
  @Input() labelField: string; 
  @Input() nameCollection: string;
  
  collection = [];
  itemId: string;
  

  constructor(private _ps: ProviderService) {
    
      
    
  }

  ngOnInit() {
  }

  ngAfterViewInit() {


    if(this.url){
      this._ps.getObjects(this.url).subscribe(
          res =>{
            this.collection = res[this.nameCollection];
            this.itemId = this.collection[0]._id;
            this.propagateChange(this.itemId);
                       
          }

      )

    }
        
  }


    
  onChange(value){
    this.itemId = value;
    this.propagateChange(this.itemId);
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
