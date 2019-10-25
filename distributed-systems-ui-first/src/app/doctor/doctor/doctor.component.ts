import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';

@Component({
  selector: 'app-Doctor',
  templateUrl: './Doctor.component.html',
  styleUrls: ['./Doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  @Input()
  username: string;

  private doctorData: DoctorInterface;

  constructor(
      private apiService: ApiService,
      private storageService: StorageService,
      private toastr: ToastrService) {
  }

  ngOnInit(): void {
      this.getDoctorDetailsData(this.storageService.get(this.storageService.username));
  }

  /**
   * Requesting doctor details data through the API Service
   * @param username  {string}
   */
  getDoctorDetailsData(username: string): void {
      console.log("getDoctor username = " + username);
      this.apiService.getDoctorDetails(username).subscribe(
          (data: DoctorInterface) => {
              /** Saving the obtained doctor data into a variable */
              this.doctorData = data;
          },
          (error: HttpErrorResponse) => console.error(error)
      );
  }

  /**
   * Will submit the doctor data if has been changed
   * This method is it bind to the `Save Doctor` button
   */
  onDoctorSave(): void {
      /** Trigger the saving method from the API Service passing the doctorData*/
      this.apiService.saveDoctorDetails(this.doctorData).subscribe(
          /** On Success */
          (data: DoctorInterface) => {
              console.log("Doctor saved");
              /** Notify the parent component to refresf the doctor list */
          },
          /** On Error */
          (error: HttpErrorResponse) => {
              /** Notify the user about the error */
              // this.toastr.error(error.message);
              /** End the isSaving flag */
          },
      );
  }

}
