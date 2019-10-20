import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientInterface } from '../models/interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /** API Common URL for all end points */
  public BASE_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /**
   * [GET] Fetch the list of Clients
   * @return {Array<ClientInterface>}
   */
  public getClients(): Observable<Array<ClientInterface>> {
    const url = `${this.BASE_URL}/employee/client`;
    return this.http.get<Array<ClientInterface>>(url);
  }

  /**
   * [GET] Fetch single Client details
   * @param ssn  {string}
   * @return {ClientInterface}
   */
  public getClientDetails(ssn: string): Observable<ClientInterface> {
    const url = `${this.BASE_URL}/employee/client/${ssn}`;
    return this.http.get<ClientInterface>(url);
  }

  /**
   * [PUT] Save client details data
   * @param clientData {ClientInterface}
   */
  public saveClientDetails(clientData: ClientInterface): Observable<ClientInterface> {
    const url = `${this.BASE_URL}/employee/client/${clientData.ssn}`;
    return this.http.put<ClientInterface>(url, clientData);
  }

  /**
   * [DELETE] Remove a client
   * @param ssn {string}
   */
  public deleteClient(ssn: string): Observable<any> {
    const url = `${this.BASE_URL}/employee/client/${ssn}`;
    return this.http.delete<ClientInterface>(url);
  }

  /**
   * [CREATE] Remove a client
   * @param ssn {string}
   */
  public createClient(clientData: ClientInterface): Observable<ClientInterface>{
    const url = `${this.BASE_URL}/employee/client/${clientData.ssn}`;
    return this.http.put<ClientInterface>(url, clientData);
  }
}
