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
        console.log("patient save", this.patientData.gender);
        this.apiService.savePatientDetails(this.patientData).subscribe(
            (data: PatientInterface) => {
                console.log("Patient saved");
            },
            (error: HttpErrorResponse) => {
            },
        );
    }


}
