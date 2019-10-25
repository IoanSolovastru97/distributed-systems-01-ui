import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { CaregiverInterface } from 'src/app/shared/models/interfaces/caregiver';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientInterface } from 'src/app/shared/models/interfaces/patient';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.scss']
})
export class CaregiverComponent implements OnInit {

  private caregiverData: CaregiverInterface;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getCaregiverDetailsData(this.storageService.get(this.storageService.username));
  }

  /**
 * Requesting caregiver details data through the API Service
 * @param username  {string}
 */
  getCaregiverDetailsData(username: string): void {
    console.log("getCaregiver username = " + username);
    this.apiService.getCaregiverDetails(username).subscribe(
      (data: CaregiverInterface) => {
        this.caregiverData = data;
      },
      (error: HttpErrorResponse) => console.error(error)
    );

  }


  // onPatientEdit(patient: PatientInterface) {
  //   console.log("On patient edit patient = " + patient.username);

  // }

  // onPatientRemove(patient: PatientInterface) {
  //   console.log("On patient remove patient = " + patient.username);
  //   this.apiService.getCaregiverDetails(patient.username).subscribe(
  //     (data: CaregiverInterface) => {
  //       this.caregiverData = data;
  //     },
  //     (error: HttpErrorResponse) => console.error(error)
  //   );
  // }

}
