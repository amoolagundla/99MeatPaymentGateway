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
       return this.http.get('http://99pumba.azurewebsites.net/api/UserInfo').map<UserInfo>((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });
	
    }

    getValues() {
        return this.http.get('http://99pumba.azurewebsites.net/api/Values').map((response: Response) => response.json())  .catch((error: any) => {
          
          return Observable.throw(error.message || error);
      });

    }
		UpdateProfile(userInfo:UserInfo) {
        return this.http.post('http://99pumba.azurewebsites.net/api/UserInfo',JSON.stringify(userInfo)).map((response: Response) => response.json())  .catch((error: any) => {
      
          return Observable.throw(error.message || error);
      });

    }
		
		  UpdateAddress(Address:any) {
        return this.http.put('http://99pumba.azurewebsites.net/api/Addresses/'+Address.Id,Address).map((response: Response) => response)  .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
		InsertAddress(Address:any) {
        return this.http.post('http://99pumba.azurewebsites.net/api/Addresses/',Address).map((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

    }
			DeleteAddress(id:any) {
        return this.http.delete('http://99pumba.azurewebsites.net/api/Addresses/'+id).map((response: Response) => response)  .catch((error: any) => {
          
          return Observable.throw(error.message || error);
      });

    }
		
		Register(user:any) {
        return this.http.post('http://99pumba.azurewebsites.net/api/Account/Register',user).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		
		PostOrder(Order:any) {
        return this.http.post('http://99pumba.azurewebsites.net/api/Orders',Order).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		PostChangePassword(passwords:any) {
        return this.http.post('http://99pumba.azurewebsites.net/api/Account/ChangePassword',passwords).map((response: Response) => response.json())
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
        return this.http.get('http://99pumba.azurewebsites.net/api/Categories').map((response: Response) => response.json())  .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
		 getAllProducts(id:any) {
        return this.http.get('http://99pumba.azurewebsites.net/api/Products/'+id).map((response: Response) => response.json()) .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
}