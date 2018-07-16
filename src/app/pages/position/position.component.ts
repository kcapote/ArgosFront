import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';
import { Util } from '../../util/util';
import { Positions } from '../../interfaces/position.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { URL_POSITIONS } from '../../services/config';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: []
})

export class PositionComponent implements OnInit {
  title: string = "Cargos"
  collection: Positions[] = [];
  id: string;
  idxSel: number;
  term: string;
  model: string = URL_POSITIONS;
  totalRecords: number;
  userTemp: any;

  constructor(private _ps: ProviderService,
              private router: Router,
              private _msg: MsgBoxService) { 

            let user = JSON.parse(localStorage.getItem('user'));
            this._ps.getObject(Util.URL_USER,user._id).subscribe(
                res => { 
                    this._ps.refresToken(res);                                           
                    this.userTemp = res.users[0];
                    if(user.role != this.userTemp.role){
                        localStorage.setItem('user','');
                        this.router.navigate(['login'])
                    }
                }
            )
      
      _ps.getObjects(Util.URL_POSITIONS).subscribe(
          res => {
            this._ps.refresToken(res); 
            this.collection = res.positions; 
             this.totalRecords = res.totalRecords;
          }
      );

    //   this._msg.notify.subscribe(
    //     res => {
    //         if(res.type == Util.ACTION_DELETE && res.response == Util.OK_RESPONSE ){
    //             this._ps.deleteObject(URL_POSITIONS,this.id).subscribe(
    //                 res => {                        
    //                     this._ps.refresToken(res);
    //                     if(res.success == true) {
    //                         this._msg.show("", Util.MSJ_DELETE_SUCCESS, Util.ACTION_SUCCESS);                                            
    //                         this.collection.splice(this.idxSel,1); 
    //                     }
    //                 }
    //             )
    //         }
    //     }
    // );



  }

  ngOnInit() {
  }


  edit(id: string) {
    
    this.router.navigate(['/pages/editPosition',id])

  }

  delete(idx:number ){
    this.id = this.collection[idx]._id;
    this.idxSel = idx;
    this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE).subscribe(
        res => {
            if(res.type == Util.ACTION_DELETE && res.response == Util.OK_RESPONSE ){
                this._ps.deleteObject(URL_POSITIONS,this.id).subscribe(
                    res => {                        
                        this._ps.refresToken(res);
                        if(res.success == true) {
                            this._msg.show("", Util.MSJ_DELETE_SUCCESS, Util.ACTION_SUCCESS);                                            
                            this.collection.splice(this.idxSel,1); 
                        }
                    }
                )
            }
        }

    ) ;

  }


  search() {
    if(this.term.length>0){
       this._ps.getObjects(URL_POSITIONS,0 ,this.term ).subscribe(
           res => {
            this._ps.refresToken(res);   
            this.collection = res.positions;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._ps.getObjects(URL_POSITIONS).subscribe(
           res => {
            this._ps.refresToken(res);  
            this.collection = res.positions;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
 }   


}
