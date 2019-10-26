import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';

@Component({
  selector: 'app-DoctorMedicalplan',
  templateUrl: './Doctor-medicalplan.component.html',
  styleUrls: ['./Doctor-medicalplan.component.scss']
})
export class DoctorMedicalplanComponent implements OnInit {

  @Input()
  username: string;

  private doctorData: DoctorInterface;

  constructor(
      private apiService: ApiService,
      private storageService: StorageService,
      private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

//   /**
//    * Requesting doctor details data through the API Service
//    * @param username  {string}
//    */
//   getDoctorMedicalplanDetailsData(username: string): void {
//       console.log("getDoctorMedicalplan username = " + username);
//       this.apiService.getDoctorMedicalplanDetails(username).subscribe(
//           (data: DoctorInterface) => {
//               /** Saving the obtained doctor data into a variable */
//               this.doctorData = data;
//           },
//           (error: HttpErrorResponse) => console.error(error)
//       );
//   }

//   /**
//    * Will submit the doctor data if has been changed
//    * This method is it bind to the `Save DoctorMedicalplan` button
//    */
//   onDoctorMedicalplanSave(): void {
//       /** Trigger the saving method from the API Service passing the doctorData*/
//       this.apiService.saveDoctorMedicalplanDetails(this.doctorData).subscribe(
//           /** On Success */
//           (data: DoctorMedicalplanInterface) => {
//               console.log("DoctorMedicalplan saved");
//               /** Notify the parent component to refresf the doctor list */
//           },
//           /** On Error */
//           (error: HttpErrorResponse) => {
//               /** Notify the user about the error */
//               // this.toastr.error(error.message);
//               /** End the isSaving flag */
//           },
//       );
//   }

}
