import { Component, OnInit, forwardRef, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  @Input() filterId;
  @Input() separator =" - ";
  @Input() idFather;
  @Input() nameFather;

  itemId: string;
  

  collection = [];
  

  constructor(private _ps: ProviderService) {
     if(this.itemId){
    
       this.propagateChange(this.itemId);
     } 
    
  }

  ngOnInit() {
    this.loadElements(this.labelField.split(",").map( e => e.trim() ) );
  }

  
  loadElements(arr:any[]){
    if(this.url && (!this.idFather && !this.nameFather) ){

      this._ps.getObjects(this.url).subscribe(
          res =>{
            this.collection = res[this.nameCollection];

            this.collection.map( e => {
              e['output'] =  this.concatenateFields(e,arr);               
            });

            //this.itemId = this.collection[0]._id;
            this.propagateChange(this.itemId);
                       
          }
      );     
    }else if( this.url && this.idFather && this.nameFather ){
      
      this._ps.getObjectsByFather(this.url,this.nameFather,0,this.idFather).subscribe(
        res =>{
          this.collection = res[this.nameCollection];

          this.collection.map( e => {
            e['output'] =  this.concatenateFields(e,arr);               
          });

          //this.itemId = this.collection[0]._id;
          this.propagateChange(this.itemId);
                     
        }
      );     
          


    }

   


  }





  concatenateFields(obj: any, arr:any[] ): string {
   
    let str = "";    
    arr.forEach(
      a=>{
        str = str + (str!==""?this.separator:"") + obj[a];
      }
    );
    return str;

  } 

  ngAfterViewInit() {


    // if(this.url){
    //   this._ps.getObjects(this.url).subscribe(
    //       res =>{
    //         this.collection = res[this.nameCollection];
    //         //this.itemId = this.collection[0]._id;
    //         this.propagateChange(this.itemId);
                       
    //       }
    //   );
      

    // }
        
  }


    
  onChange(value){
    console.log('en el combo ', value);
    this.itemId = value;
    this.propagateChange(this.itemId);
  }


  writeValue(obj: any): void {
    this.itemId = obj;
    this.propagateChange(this.itemId); 
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
