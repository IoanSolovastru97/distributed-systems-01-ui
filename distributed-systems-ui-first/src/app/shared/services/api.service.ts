import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PatientInterface } from '../models/interfaces/patient';
import { CaregiverInterface } from '../models/interfaces/caregiver';
import { DoctorInterface } from '../models/interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /** API Common URL for all end points */
  public BASE_URL: string = 'http://localhost:8080/healthcare';

  constructor(private http: HttpClient) { }

  /**
   * [GET] Fetch the list of Patients
   * @return {Array<PatientInterface>}
   */
  public getPatients(): Observable<Array<PatientInterface>> {
    console.log("Here")
    const url = `${this.BASE_URL}/patient`;
    return this.http.get<Array<PatientInterface>>(url);
  }

  /**
   * [GET] Fetch single Patient details
   * @param username  {string}
   * @return {PatientInterface}
   */
  public getPatientDetails(username: string): Observable<PatientInterface> {
    const url = `${this.BASE_URL}/patient/${username}`;
    console.log("getPatient URL = " + url);
    return this.http.get<PatientInterface>(url);
  }

  /**
   * [PUT] Save patient details data
   * @param patientData {PatientInterfacye}
   */
  public savePatientDetails(patientData: PatientInterface): Observable<PatientInterface> {
    console.log("Save patient service = " + patientData.name);
    const url = `${this.BASE_URL}/patient`;
    return this.http.put<PatientInterface>(url, patientData);
  }

  /**
   * [DELETE] Remove a patient
   * @param username {string}
   */
  public deletePatient(username: string): Observable<any> {
    const url = `${this.BASE_URL}/patient/${username}`;
    return this.http.delete<PatientInterface>(url);
  }

  /**
   * [CREATE] Remove a patient
   * @param username {string}
   */
  public createPatient(patientData: PatientInterface): Observable<PatientInterface> {
    const url = `${this.BASE_URL}/patient/${patientData.username}`;
    return this.http.put<PatientInterface>(url, patientData);
  }

  //Caregiver
  /**
 * [GET] Fetch single Patient details
 * @param username  {string}
 * @return {PatientInterface}
 */
  public getCaregiverDetails(username: string): Observable<CaregiverInterface> {
    const url = `${this.BASE_URL}/caregiver/${username}`;
    console.log("getCaregiver URL = " + url);
    return this.http.get<CaregiverInterface>(url);
  }

  //Doctor
  public getDoctorDetails(username: string): Observable<DoctorInterface> {
    const url = `${this.BASE_URL}/doctor/${username}`;
    console.log("getCaregiver URL = " + url);
    return this.http.get<DoctorInterface>(url);
  }

  /**
   * [PUT] Save doctor details data
   * @param doctorData {DoctorInterfacye}
   */
  public saveDoctorDetails(doctorData: DoctorInterface): Observable<DoctorInterface> {
    console.log("Save doctor service = " + doctorData.name);
    const url = `${this.BASE_URL}/doctor`;
    return this.http.put<DoctorInterface>(url, doctorData);
  }

  
  /**
   * [PUT] Create caregiver details data
   * @param caregiverData {CaregiverInterfacye}
   */
  public createCaregiverDoctor(caregiverData: CaregiverInterface): Observable<CaregiverInterface> {
    console.log("Save caregiver service = " + caregiverData.name);
    const url = `${this.BASE_URL}/doctor/caregiver`;
    return this.http.post<CaregiverInterface>(url, caregiverData);
  }

  /**
   * [PUT] Save doctor patient details data
   * @param patient {DoctorInterfacye}
   */
  public savePatientDetailsDoctor(patientData: PatientInterface): Observable<PatientInterface> {
    console.log("Save doctor patient service = " + patientData.name);
    const url = `${this.BASE_URL}/doctor/patient`;
    return this.http.put<PatientInterface>(url, patientData);
  }

  /**
   * [PUT] Save doctor caregiver details data
   * @param caregiver {CaregiverInterfacye}
   */
  public saveCaregiverDetailsDoctor(caregiverData: CaregiverInterface): Observable<CaregiverInterface> {
    console.log("Save doctor caregiver service = " + caregiverData.name);
    const url = `${this.BASE_URL}/doctor/caregiver`;
    return this.http.put<CaregiverInterface>(url, caregiverData);
  }

  /**
   * [DELETE] Remove a patient
   * @param username {string}
   */
  public deletePatientDoctor(username: string): Observable<any> {
    const url = `${this.BASE_URL}/doctor/patient/${username}`;
    return this.http.delete<PatientInterface>(url);
  }

  /**
   * [DELETE] Remove a caregiver
   * @param username {string}
   */
  public deleteCaregiverDoctor(username: string): Observable<any> {
    const url = `${this.BASE_URL}/doctor/caregiver/${username}`;
    return this.http.delete<CaregiverInterface>(url);
  }

  public getCaregiversDoctor(username: string): Observable<Array<CaregiverInterface>> {
    const url = `${this.BASE_URL}/doctor/caregiver`;
    console.log("getCaregiver URL = " + url);
    return this.http.get<Array<CaregiverInterface>>(url);
  }

}
