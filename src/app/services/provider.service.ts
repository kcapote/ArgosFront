import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ProviderService {

  constructor(public http: HttpClient) { }



  public getObjects(url: string): Observable<any> {
       
        return this.http.get( `${url}?${ Util.TOKEN }`);                
  }

  public getObject(url: string, id: string): Observable<any> {
    let urlTemp = `${url}/${ id }?${ Util.TOKEN }`;
    console.log('la url es ', urlTemp);
    

    return this.http.get( urlTemp );
  }

  public saveObject(url: string, obj: any): Observable<any> {
    
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    let urlTemp = `${url}?${ Util.TOKEN }`;
  
    return this.http.post( urlTemp, obj, {headers});
    

  }

  public updateObject(url: string, id: string ,obj: any ): Observable<any> {
      
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    let urlTemp = `${ url }/${ id }?${ Util.TOKEN }`;
  
    return this.http.put(urlTemp,obj, {headers});

  } 

  public deleteObject(url:string, id:string ): Observable<any>{
    let urlTemp = `${ url }/${ id }?${ Util.TOKEN }`;
    
    return this.http.delete(urlTemp);
  }

}
