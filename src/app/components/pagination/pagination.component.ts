import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styles: [],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginationComponent),
      multi: true
    }]
})
export class PaginationComponent implements OnInit, ControlValueAccessor {
  
  @Input() url;
  @Input() page;
  @Input() term;
  @Input() collectionName;  
  @Input() collection:any[] = [];
  @Input() totalRecords: number;
  @Output('change') change: EventEmitter<boolean> = new EventEmitter<boolean>();
    
  existNext: boolean;
  existPrevious: boolean;
  
  numberPage: number = 0;

  constructor(private _ps: ProviderService) {
    this.existNext = true;
  }
  




  ngOnInit() {
  }


  next() {

    this.numberPage += 10;
    
    if(this.numberPage+10>this.totalRecords){
      this.existNext = false;
           
    }else{
      this.existNext = true;  
    }
   

    if(this.term > 0){  
    this._ps.getObjects(this.url, this.numberPage,this.term ).subscribe(
        res => {
            this._ps.refresToken(res);
            this.collection = res[this.collectionName];
            this.propagateChange(this.collection);
            this.change.emit(true);                       
        }  
    );
    }else{
      this._ps.getObjects(this.url, this.numberPage).subscribe(
        res => {
          this._ps.refresToken(res);
          this.collection = res[this.collectionName];
          this.propagateChange(this.collection);
          this.change.emit(true);
        }  
     );
    }
   
    
  }


  previous (){    
    this.numberPage -= 10;
    
    if(this.term > 0){  
    this._ps.getObjects(this.url, this.numberPage,this.term ).subscribe(
        res => {
          this._ps.refresToken(res);  
          this.totalRecords = res.totalRecords;
          this.collection = res[this.collectionName];
          this.propagateChange(this.collection);
          this.change.emit(true);                       
        }  
    );
    }else{
      
      this._ps.getObjects(this.url, this.numberPage).subscribe(
        res => {
          this._ps.refresToken(res);
          this.totalRecords = res.totalRecords;
          this.collection = res[this.collectionName];
          this.propagateChange(this.collection);
          this.change.emit(true);
        }  
     );
    } 
    
  }

  getMaxpages() {
    let e  = Math.floor(this.totalRecords/10);
    let r = this.totalRecords % 10;
    return  r>0?e+1:e;

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
