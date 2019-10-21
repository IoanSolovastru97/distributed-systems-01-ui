import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from './storage.service';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {
  /** API Common URL for all end points */
  public BASE_URL: string = 'http://localhost:8080/healthcare';

  constructor(private http: HttpClient, private storageService: StorageService) {}
  /**
   * Verify if the application token is storaged on the browser already
   * @return {boolean}
   */
  isLoggedIn(): boolean {
    const token: any = this.storageService.get(this.storageService.app_token);
    return token ? true : false;
  }
  /**
   * Submit the user credentials to the server
   * @param  {string} username          login name
   * @param  {string} password          user password
   * @param  {string} authorizationCode basic authentication token
   * @return {Observable}
   */
  login(username: string, password: string, authorizationCode: string): Observable<any> {
    
    const url = `${this.BASE_URL}/login`;
    const header: any = new HttpHeaders({
      Authorization: `Basic ${authorizationCode}`
    });
    return this.http.get(url, {
      headers: header
    });
  }
}
