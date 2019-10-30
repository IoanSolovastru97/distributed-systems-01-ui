import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { CaregiverInterface } from 'src/app/shared/models/interfaces/caregiver';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'doctor-caregiver-edit',
    templateUrl: './doctor-caregiver-edit.component.html',
    styleUrls: ['./doctor-caregiver-edit.component.scss']
})

export class DoctorCaregiverEdit implements OnInit {

    private caregiverData: CaregiverInterface = new CaregiverInterface();
    private router: Router;

    constructor(
        private apiService: ApiService,
        router: Router,
        private storageService: StorageService,
        private toastr: ToastrService) {
        this.router = router;
    }


    ngOnInit(): void {
        console.log("Caregiver",this.storageService.get(this.storageService.caregiver));
        this.getCaregiverDetailsData(this.storageService.get(this.storageService.caregiver));
    }

    /**
     * Requesting caregiver details data through the API Service
     * @param username  {string}
     */
    getCaregiverDetailsData(username: string): void {
        console.log("getPerson username = " + username);
        this.apiService.getCaregiverDetails(username).subscribe(
            (data: CaregiverInterface) => {
                /** Saving the obtained caregiver data into a variable */
                this.caregiverData = data;
            },
            (error: HttpErrorResponse) => console.error(error)
        );
    }

    /**
 * Will submit the caregiver data if has been changed
 * This method is it bind to the `Save Caregiver` button
 */
    onCaregiverSave(): void {
        /** Trigger the saving method from the API Service passing the caregiverData*/
        this.apiService.saveCaregiverDetailsDoctor(this.caregiverData).subscribe(
            /** On Success */
            (data: CaregiverInterface) => {
                console.log("Caregiver saved");
                /** Notify the parent component to refresf the caregiver list */
            },
            /** On Error */
            (error: HttpErrorResponse) => {
                /** Notify the user about the error */
                // this.toastr.error(error.message);
                /** End the isSaving flag */
            },
        );
    }


    onCaregiverCancel(): void {
        this.router.navigate(['/doctor/caregiver']);
    }

    onCaregiverRemove(): void {
        console.log("On caregiver remove caregiver = " + this.caregiverData.username);
        this.apiService.deleteCaregiverDoctor(this.caregiverData).subscribe(
        ()=>{},
          (error: HttpErrorResponse) => console.error(error)
        );
        this.router.navigate(['/doctor/caregiver']);
    }


}