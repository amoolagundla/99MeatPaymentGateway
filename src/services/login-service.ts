import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch'; 
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
 

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
 
    login(userName: string, Password: string) {
			
			 let url = "http://localhost:53852/Token";
        let body = "username=" + userName + "&password=" + Password + "&grant_type=password";
        let headers = new Headers();
				headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );

				
        let options = new RequestOptions({ headers: headers });        
         
       return this.http.post(url, body, options)
              .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(user.access_token));
											localStorage.setItem('userName', JSON.stringify(user.userName));
										return response.json();
                }
            }).catch(this.handleError);
      
    }
          private handleError(error:Response)
					{
						return Observable.throw(error.json().error ||'server error');
					}
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}