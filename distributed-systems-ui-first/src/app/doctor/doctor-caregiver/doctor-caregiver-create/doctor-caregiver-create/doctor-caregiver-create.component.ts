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
  templateUrl: './Doctor-caregiver-create.component.html',
  styleUrls: ['./Doctor-caregiver-create.component.scss']
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
      (data: CaregiverInterface) => {
        console.log("Caregiver saved");
        this.router.navigate(['/doctor/caregiver'])
      },
      /** On Error */
      (error: HttpErrorResponse) => {
        /** Notify the user about the error */
        // this.toastr.error(error.message);
        /** End the isSaving flag */
      },
    );
  }

  public onCaregiverCancel(): void {
    this.router.navigate(['/doctor/caregiver'])
  }

}
