import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { PatientInterface } from 'src/app/shared/models/interfaces/patient';

import { PatientModel } from 'src/app/shared/models/patient.model';
import { ApiService } from 'src/app/shared/services/api.service';

import { DataService } from 'src/app/shared/services/data.service';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {


    username: string;

    @Input()
    addPatient: boolean;

    @Output()
    onSaveSuccess: EventEmitter<boolean> = new EventEmitter();

    /** Patient data */
    private patientData: PatientInterface;
    /** Copy of the initial patient data */
    private _patientData: PatientInterface;
    /** Flag for letting know the user that save is in progress */
    private isSaving: boolean;
    /** Flag for letting know the user that save is in progress */
    private isRemoving: boolean;

    constructor(
        public patientModel: PatientModel,
        private apiService: ApiService,
        private storageService: StorageService,
        private toastr: ToastrService) {
    }

    /**
     * This is an Angular method
     * (one of the lifcecycle component hooks: https://angular.io/guide/lifecycle-hooks)
     * Will detect changes on the @Input data, e.g when user select a diferent patient from the list
     */

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
                /** Making copy of the initial patient data (for comparing purpose only) */
                this._patientData = Object.assign({}, this.patientData);
            },
            (error: HttpErrorResponse) => console.error(error)
        );
    }

    /**
     * Will submit the patient data if has been changed
     * This method is it bind to the `Save Patient` button
     */
    onPatientSave(): void {
        /** Initialize the isSaving flag */
        this.isSaving = true;
        /** Trigger the saving method from the API Service passing the patientData*/
        this.apiService.savePatientDetails(this.patientData).subscribe(
            /** On Success */
            (data: PatientInterface) => {
                /** Update the copy of the initial patient data */
                this._patientData = data;
                /** Notify the parent component to refresf the patient list */
                this.onSaveSuccess.emit(true);
                /** Notify the user with a successful message */
                this.toastr.success('Patient details updated!');
            },
            /** On Error */
            (error: HttpErrorResponse) => {
                /** Notify the user about the error */
                this.toastr.error(error.message);
                /** End the isSaving flag */
                this.isSaving = false;
            },
            /** End the isSaving flag */
            () => (this.isSaving = false)
        );
    }


    /**
     * Will determinate if the data has been changed or not
     * Buttons will remaing disabled if not change has happened
     */
    hasPatientDataChanged(): boolean {
        return JSON.stringify(this.patientData) !== JSON.stringify(this._patientData);
    }

    /** This method will clear the `patientData` value and `_patientData` copy value */
    clearComponentData(): void {
        this.patientData = undefined;
        this._patientData = undefined;
    }

}
