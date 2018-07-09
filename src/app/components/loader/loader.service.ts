import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {

  public hideModal: string ="modal-hide";

  constructor() {    
  }

  hide() {
    this.hideModal = "modal-hide";
  }


  show(){
    this.hideModal = "";
  }
  
}
