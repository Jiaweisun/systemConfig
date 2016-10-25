/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import  {System} from '../entity/system';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SystemService {
     
     constructor (private http: Http) {}
     private listUrl = "http://localhost:3200/system/list";
     private getUrl = "http://localhost:3200/system/get";
     private addUrl = "http://localhost:3200/system/add";

     listSystem() : Observable<System[]>{        
         return this.http.get(this.listUrl)                       
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

     getSystem(id: number): Observable<System[]>  { //observable -- map,   promise--then
         return this.http.get(this.getUrl+"/"+id)                        
                .map((res:Response) => res.json())
                // .do(user =>console.log(user+'....from service'+id))                       
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }

      addSystem (body:Object): Observable<System[]>{         
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.addUrl, body, options) // ...using post request
                         .map((res:Response) => {
                             res.json();
                         }) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
      }
}
