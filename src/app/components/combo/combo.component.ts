import { Component, OnInit, forwardRef, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { async } from '@angular/core/testing';

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


  idF: string = ""; 
  @Input('idFather') 
  set idFather(val: string) {
       if(val){
         this.idF = val;         
         this.load();
        } 
       
  }
  
  @Input() nameFather;
  @Input() changeValue = new EventEmitter<any>();
  @Output() loading = true;


  itemId: any;
  nested: number;
  
  collection = [];
  

  constructor(private _ps: ProviderService) {
     if(this.itemId) {
    
       this.propagateChange(this.itemId);
     }
           
    
  }

  ngOnInit() {

      this.load();
     
      

  }

  load() {
        
    let c =  this.labelField.split(this.separator);
    this.nested = (c[0].split('.')).length;
    this.loadElements(this.labelField.split(",").map( e => e.trim() ) );
  }
  
  loadElements(arr:string[]){

    if(this.nested > 1 ) {
      let b = (arr[0]).split('.') ;
      let c = [b[0], '_id']
           
        this.collection.forEach(
          r => {
             r['_id'] =  this.extractValue(r,c);
          }
        )
    }  

    if(this.url && (!this.nameFather && !this.idF) ){
      
       this._ps.getObjects(this.url,0).subscribe(
        res => {
            this._ps.refresToken(res);
            //console.log(res);
            
            this.collection = res[this.nameCollection];
            
            this.collection.map( e => {
               e['output'] =  this.concatenateFields(e,arr);               
            });
            this.propagateChange(this.itemId);
            this.loading = false;
            this.loadSel();
          }
      );     
    }else if( this.url && this.idF && this.idF,0) {
      
      this._ps.getObjectsByFather(this.url,this.nameFather,0,this.idF).subscribe(
        res =>{
          this._ps.refresToken(res);
          //console.log(res);          
          this.collection = res[this.nameCollection];
         // console.log('el collection ',this.nameCollection, 'es ', this.collection  );
          this.collection.map( e => {
            e['output'] =  this.concatenateFields(e,arr);               
          });
          this.propagateChange(this.itemId);
          this.loading = false;
          this.loadSel();
        }
      ); 
    }

    
  
    
    
    
  }
  

  loadSel(){
    
    if(this.itemId){
      this.itemId = this.collection.find( c => c['_id']== this.itemId);

    }

  }


  concatenateFields(obj: any, arr:string[] ): string {
    
    let str = "";    
    arr.forEach(
      a=>{
        let b = a.split('.');
        str = str + (str!==""?this.separator:"") + this.extractValue(obj,b) ;
      }
    );
    return str;

  } 


  extractValue(obj: any, arr: string[]): any {
    
    if ( arr.length  == 1 ) {       
        return obj[arr[0]];  
    }else {
        let objTemp = obj[arr[0]];
        let y = arr.splice(1,1);                  
        return this.extractValue(objTemp,y); 
    }


  }


  ngAfterViewInit() {
   
    
        
  }


    
  onChange(value: any){
       
  
    //console.log('el id es en el onchenge ', this.itemId);
    
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
