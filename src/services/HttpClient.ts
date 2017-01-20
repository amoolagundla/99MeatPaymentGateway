import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
	
		headers.append('Authorization', 'Bearer ' + currentUser ); 
headers.append( 'Content-Type', 'application/json' );

  }

  get(url) {
     
      let headers = new Headers();
			   this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }
delete(url) {
     
      let headers = new Headers();
			   this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }
  post(url, data) {
     let headers = new Headers();
			   this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
	
	put(url, data) {
     let headers = new Headers();
			   this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }
}