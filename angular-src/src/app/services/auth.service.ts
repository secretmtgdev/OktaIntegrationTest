import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken: any;
  public user: any;
  private host: string = 'http://localhost:';
  private PORT: string = '3000';

  constructor(private http: Http) { }

  // make the backend call to register the user
  public registerUser(user): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + this.PORT + "/users/register", user, {
      headers: headers
    }).map(res => res.json());
  }
}
