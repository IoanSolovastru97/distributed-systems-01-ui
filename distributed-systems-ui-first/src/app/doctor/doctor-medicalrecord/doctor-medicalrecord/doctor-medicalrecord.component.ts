import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';
import { Router } from '@angular/router';
import { MedicalrecordInterface } from 'src/app/shared/models/interfaces/medicalrecord';

@Component({
  selector: 'app-DoctorMedicalrecord',
  templateUrl: './Doctor-medicalrecord.component.html',
  styleUrls: ['./Doctor-medicalrecord.component.scss']
})
export class DoctorMedicalrecordComponent implements OnInit {

  private router: Router;
  private apiService: ApiService

  public doctorData: DoctorInterface = new DoctorInterface();
  public medicalrecords: Array<MedicalrecordInterface> = new Array<MedicalrecordInterface>();

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
    this.getDoctorMedicalrecordDetails(this.storageService.get(this.storageService.username));
    console.log(this.medicalrecords);
    this.getMedicalrecords();
  }

  /**
   * Requesting doctor details data through the API Service
   * @param id  {string}
   */
  public getDoctorMedicalrecordDetails(id: string): void {
    console.log("getDoctorMedicalrecord id = " + id);
    this.apiService.getDoctorDetails(id).subscribe(
      (data: DoctorInterface) => {
        /** Saving the obtained doctor data into a variable */
        this.doctorData = data;
        console.log(data, "data");
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }


  public onMedicalrecordEdit(medicalrecord: MedicalrecordInterface): void {
    console.log(medicalrecord.id, "id")
    
  }

  public onMedicalrecordRemove(medicalrecordData: MedicalrecordInterface): void {
    console.log("On medicalrecord remove medicalrecord = " + medicalrecordData.id);
    this.apiService.deleteMedicalrecordDoctor(medicalrecordData.id).subscribe(
      () => { },
      (error: HttpErrorResponse) => console.error(error)
    );
    this.router.navigate(['/doctor/medicalrecord']);
  }

  public getMedicalrecords(){

    this.apiService.getMedicalrecords().subscribe(
      (data: MedicalrecordInterface[]) => {
        /** Saving the obtained doctor data into a variable */
        this.medicalrecords = data;
        console.log(data, "data");
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }

}
