import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { PatientInterface } from 'src/app/shared/models/interfaces/patient';

import { ApiService } from 'src/app/shared/services/api.service';

import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

    @Input()
    username: string;

    private patientData: PatientInterface;

    constructor(
        private apiService: ApiService,
        private storageService: StorageService,
        private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.getPatientDetailsData(this.storageService.get(this.storageService.username));
    }

    /**
     * Requesting patient details data through the API Service
     * @param username  {string}
     */
    getPatientDetailsData(username: string): void {
        console.log("getPerson username = " + username);
        this.apiService.getPatientDetails(username).subscribe(
            (data: PatientInterface) => {
                /** Saving the obtained patient data into a variable */
                this.patientData = data;
            },
            (error: HttpErrorResponse) => console.error(error)
        );
    }

    /**
     * Will submit the patient data if has been changed
     * This method is it bind to the `Save Patient` button
     */
    onPatientSave(): void {
        /** Trigger the saving method from the API Service passing the patientData*/
        this.apiService.savePatientDetails(this.patientData).subscribe(
            /** On Success */
            (data: PatientInterface) => {
                console.log("Patient saved");
                /** Notify the parent component to refresf the patient list */
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
