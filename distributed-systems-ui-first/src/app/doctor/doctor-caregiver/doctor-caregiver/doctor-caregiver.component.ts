import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';

@Component({
  selector: 'app-DoctorCaregiver',
  templateUrl: './Doctor-caregiver.component.html',
  styleUrls: ['./Doctor-caregiver.component.scss']
})
export class DoctorCaregiverComponent implements OnInit {

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
//   getDoctorCaregiverDetailsData(username: string): void {
//       console.log("getDoctorCaregiver username = " + username);
//       this.apiService.getDoctorCaregiverDetails(username).subscribe(
//           (data: DoctorInterface) => {
//               /** Saving the obtained doctor data into a variable */
//               this.doctorData = data;
//           },
//           (error: HttpErrorResponse) => console.error(error)
//       );
//   }

//   /**
//    * Will submit the doctor data if has been changed
//    * This method is it bind to the `Save DoctorCaregiver` button
//    */
//   onDoctorCaregiverSave(): void {
//       /** Trigger the saving method from the API Service passing the doctorData*/
//       this.apiService.saveDoctorCaregiverDetails(this.doctorData).subscribe(
//           /** On Success */
//           (data: DoctorCaregiverInterface) => {
//               console.log("DoctorCaregiver saved");
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
