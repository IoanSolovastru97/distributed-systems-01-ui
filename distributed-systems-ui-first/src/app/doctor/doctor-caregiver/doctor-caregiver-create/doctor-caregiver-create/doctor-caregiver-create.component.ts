import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';
import { Router } from '@angular/router';
import { CaregiverInterface } from 'src/app/shared/models/interfaces/caregiver';

@Component({
  selector: 'app-DoctorCaregiverCreate',
  templateUrl: './doctor-caregiver-create.component.html',
  styleUrls: ['./doctor-caregiver-create.component.scss']
})
export class DoctorCaregiverCreateComponent {

  public caregiverData: CaregiverInterface = new CaregiverInterface();

  private router: Router;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    router: Router,
    private toastr: ToastrService) {
    this.router = router;
  }


  onCaregiverSave(): void {
    console.log("onCaregiverSave()");
    console.log(this.caregiverData.name);
    console.log(this.caregiverData.password);
    console.log(this.caregiverData.gender);
    console.log(this.caregiverData.address);
    /** Trigger the saving method from the API Service passing the caregiverData*/
    this.apiService.createCaregiverDoctor(this.caregiverData).subscribe(
      /** On Success */
      (data: String) => {
        console.log("Caregiver saved", data);
        
      },
      /** On Error */
      (error: HttpErrorResponse) => {
      },
    );
    this.router.navigate(['/doctor/caregiver']);
  }

  public onCaregiverCancel(): void {
    this.router.navigate(['/doctor/caregiver']);
  }

}
