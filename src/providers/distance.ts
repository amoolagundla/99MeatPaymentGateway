import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Response } from '@angular/http';
import {HttpClient}  from '../services/HttpClient';


@Injectable()
export class Distance {

  constructor(public http: HttpClient) {
    console.log('Hello Distance Provider');
  }
    getDuration(sourceAddress:any,destinationAddress:any ) {
		 let _headers = new Headers();
		   _headers.append('Access-Control-Allow-Headers','*');
  _headers.append('Content-Type', 'application/json; charset=UTF-8');
 

       return this.http.get('http://localhost:52711/api/values/GetDistance/'+sourceAddress+'/'+destinationAddress).map((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });
	
    }
}
