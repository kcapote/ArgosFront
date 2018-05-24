import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ProviderService {

  constructor(public http: HttpClient) { }



  public getObjects(url: string, pagination: number = 0 ,term?: string): Observable<any> {
        let urlTemp;
        console.log('======LOCAL=======');
        console.log(localStorage.getItem('user'));
        console.log('======LOCAL=======');
        let user = JSON.parse(localStorage.getItem('user'));
        if(term) {
          urlTemp = `${url}/search/${ term }/true?pagination=${ pagination }&token=${ user.token }`;
        } else {
          urlTemp = `${url}/recordActive/true?pagination=${ pagination }&token=${ user.token }`;
        }
        console.log('======1=======');
        console.log(user.token);
        console.log('======1=======');
        console.log('======1=======');
        console.log(urlTemp);
        console.log('======1=======');
        return this.http.get( urlTemp );                
  }

  public getObjectsAny(url: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    let urlTemp = `${url}?token=${ user.token }`;
    console.log('======2=======');
    console.log(user.token);
    console.log('======2=======');
    return this.http.get( urlTemp );                
  }


  public getObjectsByFather(url: string, father: string , pagination: number = 0 ,id: string): Observable<any> {
    let urlTemp;    
    let user = JSON.parse(localStorage.getItem('user'));
    urlTemp = `${ url }/${ father }/${ id }?pagination=${ pagination }&token=${ user.token }`;
    console.log('======3=======');
    console.log(user.token);
    console.log('======3=======');
    return this.http.get( urlTemp );                
  }

  public getObject(url: string, id: string): Observable<any> {
    let urlTemp = '';
    if(url!=Util.URL_LOGON){
      let user = JSON.parse(localStorage.getItem('user'));
      urlTemp = `${url}/${ id }?token=${ user.token }`;
      console.log('======4=======');
      console.log(user.token);
      console.log('======4=======');
    }else{
      urlTemp = `${url}/${ id }?${ Util.TOKEN }`;
    }
    return this.http.get( urlTemp );
  }

  public saveObject(url: string, obj: any): Observable<any> {
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    let urlTemp = '';
    if(url!=Util.URL_LOGIN){
      let user = JSON.parse(localStorage.getItem('user'));
      urlTemp = `${url}?token=${ user.token }`;
      console.log('======5=======');
      console.log(user.token);
      console.log('======5=======');
    }else{
      localStorage.setItem('user','');
      urlTemp = `${url}?${ Util.TOKEN }`;
    }
    
    return this.http.post( urlTemp, obj, {headers});
   
  }

  public updateObject(url: string, id: string ,obj: any ): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    let urlTemp = `${ url }/${ id }?token=${ user.token }`;
    console.log('======6=======');
    console.log(user.token);
    console.log('======6=======');
    return this.http.put(urlTemp,obj, {headers});

  } 

  public deleteObject(url:string, id:string ): Observable<any>{
    let user = JSON.parse(localStorage.getItem('user'));
    let urlTemp = `${ url }/${ id }?token=${ user.token }`;
    console.log('======7=======');
    console.log(user.token);
    console.log('======7=======');
    return this.http.delete(urlTemp);
  }

  public refresToken(res){
    localStorage.setItem('user',JSON.stringify(res.user));
  }

}
