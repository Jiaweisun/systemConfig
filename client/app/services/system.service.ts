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
     private baseUrl = "http://localhost:3200/system";

     listSystem() : Observable<System[]>{        
         return this.http.get(this.baseUrl+"/list")                       
                         .map((res:Response) => res.json())
                         .catch(this.handleError); 
        
     }

     getSystem(id: number): Observable<System[]>  { //observable -- map,   promise--then
         return this.http.get(this.baseUrl+"/get/"+id)                        
                     .map((res:Response) => res.json())
                      .catch(this.handleError); 
        
      }

      addSystem (body:Object): Observable<System[]>{         
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.baseUrl+"/add", body, options) // ...using post request
                         .map((res:Response) => res.json())
                         .catch(this.handleError); //...errors if any
      }


      deleteSystem(id: number): Observable<System[]>{
         return this.http.delete(`${this.baseUrl}/delete/${id}`)
                         .map((res:Response) => res.json())
                         .catch(this.handleError); 
      }
        private handleError (error: any) {
            let errMsg = 'server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
        }      

}
