import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';
import { Router } from '@angular/router';
import { PatientInterface } from 'src/app/shared/models/interfaces/patient';

@Component({
  selector: 'app-DoctorPatientCreate',
  templateUrl: './Doctor-patient-create.component.html',
  styleUrls: ['./Doctor-patient-create.component.scss']
})
export class DoctorPatientCreateComponent {

  public patientData: PatientInterface = new PatientInterface();

  private router: Router;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    router: Router,
    private toastr: ToastrService) {
    this.router = router;
  }


  onPatientSave(): void {
    console.log("onPatientSave()");
    console.log(this.patientData.name);
    console.log(this.patientData.password);
    console.log(this.patientData.gender);
    console.log(this.patientData.address);
    
    this.apiService.createPatientDoctor(this.patientData).subscribe(
      /** On Success */
      (data: String) => {
        console.log("Patient saved");
        
      },
      /** On Error */
      (error: HttpErrorResponse) => {
      },
    );
    this.router.navigate(['/doctor/patient']);
  }

  public onPatientCancel(): void {
    this.router.navigate(['/doctor/patient']);
  }

}
