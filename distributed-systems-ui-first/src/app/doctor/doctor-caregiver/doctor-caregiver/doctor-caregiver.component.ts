import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';
import { Router } from '@angular/router';
import { CaregiverInterface } from 'src/app/shared/models/interfaces/caregiver';

@Component({
  selector: 'app-DoctorCaregiver',
  templateUrl: './doctor-caregiver.component.html',
  styleUrls: ['./doctor-caregiver.component.scss']
})
export class DoctorCaregiverComponent implements OnInit {

  private router: Router;
  private apiService: ApiService

  public doctorData: DoctorInterface = new DoctorInterface();
  public caregivers: Array<CaregiverInterface> = new Array<CaregiverInterface>();

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
    console.log("getDoctorCaregiver username = " + username);
    this.apiService.getDoctorDetails(username).subscribe(
      (data: DoctorInterface) => {
        this.doctorData = data;
        console.log(data, "data");
      },
      (error: HttpErrorResponse) => console.error(error)
    );

    this.apiService.getCaregiversDoctor(username).subscribe(
      (data: Array<CaregiverInterface>) => {
        this.caregivers = data;
      },
      (error: HttpErrorResponse) => console.error(error)
    );

  }


  public onCaregiverEdit(caregiver: CaregiverInterface): void {
    this.storageService.set(this.storageService.caregiver, caregiver.username);
  }

  public onCaregiverRemove(caregiverData: CaregiverInterface): void {
    console.log("On caregiver remove caregiver = " + caregiverData.username);
    this.apiService.deleteCaregiverDoctor(caregiverData).subscribe(
      () => { },
      (error: HttpErrorResponse) => console.error(error)
    );
    this.router.navigate(['/doctor/caregiver']);
  }

}
