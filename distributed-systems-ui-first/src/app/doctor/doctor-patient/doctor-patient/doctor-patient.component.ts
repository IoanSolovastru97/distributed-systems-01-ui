import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';
import { Router } from '@angular/router';
import { PatientInterface } from 'src/app/shared/models/interfaces/patient';

@Component({
  selector: 'app-DoctorPatient',
  templateUrl: './Doctor-patient.component.html',
  styleUrls: ['./Doctor-patient.component.scss']
})
export class DoctorPatientComponent implements OnInit {

  private router: Router;
  private apiService: ApiService

  public doctorData: DoctorInterface = new DoctorInterface();
  public patients: Array<PatientInterface> = new Array<PatientInterface>();

  constructor(
    apiService: ApiService,
    router: Router,
    private storageService: StorageService,
    private toastr: ToastrService) {
    this.router = router;
    this.apiService = apiService;
  }

  ngOnInit(): void {
    console.log(this.storageService.get(this.storageService.username));
    this.getDoctorDetails(this.storageService.get(this.storageService.username));
  }

  /**
   * Requesting doctor details data through the API Service
   * @param username  {string}
   */
  public getDoctorDetails(username: string): void {
    console.log("getDoctorPatient username = " + username);
    this.apiService.getDoctorDetails(username).subscribe(
      (data: DoctorInterface) => {
        /** Saving the obtained doctor data into a variable */
        this.doctorData = data;
        this.patients = data.patients;
        console.log(data, "data");
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }


  public onPatientEdit(patient: PatientInterface): void {
    console.log(patient.username, "username")
    this.storageService.set("patient", patient.username);
  }

}
