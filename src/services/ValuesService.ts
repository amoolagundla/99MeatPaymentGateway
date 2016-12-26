import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import {HttpClient} from './HttpClient';
import {UserInfo} from '../app/app.module';
import {Observable} from 'rxjs/Rx';
import  'rxjs/add/operator/mergeMap'; 
import * as Rx from 'rxjs/rx';
@Injectable()
export class ValuesService {
	public UserInfo:any;
	public Categories:any;
    constructor(private http: HttpClient) { }

    getAll() {
       return this.http.get('http://localhost:53852/api/UserInfo').map<UserInfo>((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });
	
    }

    getValues() {
        return this.http.get('http://localhost:53852/api/Values').map((response: Response) => response.json())  .catch((error: any) => {
          
          return Observable.throw(error.message || error);
      });

    }
		UpdateProfile(userInfo:UserInfo) {
        return this.http.post('http://localhost:53852/api/UserInfo',JSON.stringify(userInfo)).map((response: Response) => response.json())  .catch((error: any) => {
      
          return Observable.throw(error.message || error);
      });

    }
		
		  UpdateAddress(Address:any) {
        return this.http.put('http://localhost:53852/api/Addresses/'+Address.Id,Address).map((response: Response) => response)  .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
		InsertAddress(Address:any) {
        return this.http.post('http://localhost:53852/api/Addresses/',Address).map((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

    }
			DeleteAddress(id:any) {
        return this.http.delete('http://localhost:53852/api/Addresses/'+id).map((response: Response) => response)  .catch((error: any) => {
          
          return Observable.throw(error.message || error);
      });

    }
		
		Register(user:any) {
        return this.http.post('http://localhost:53852/api/Account/Register',user).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		
		PostOrder(Order:any) {
        return this.http.post('http://localhost:53852/api/Orders',Order).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		PostChangePassword(passwords:any) {
        return this.http.post('http://localhost:53852/api/Account/ChangePassword',passwords).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		 private handleError(initialError:Response)
					{
						if (initialError && initialError.status === 401) {
                  return Observable.throw(initialError.json().error ||'server error');
         } else {
         return Observable.throw(initialError.json().error ||'server error');
         }
						
					}
		
	 getAllCategories() { 
        return this.http.get('http://localhost:53852/api/Categories').map((response: Response) => response.json())  .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
		 getAllProducts(id:any) {
        return this.http.get('http://localhost:53852/api/Products/'+id).map((response: Response) => response.json()) .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
}