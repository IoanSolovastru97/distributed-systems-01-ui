import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { PatientInterface } from 'src/app/shared/models/interfaces/patient';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'doctor-patient-edit',
    templateUrl: './doctor-patient-edit.component.html',
    styleUrls: ['./doctor-patient-edit.component.scss']
})

export class DoctorPatientEdit implements OnInit {

    private patientData: PatientInterface = new PatientInterface();
    private router: Router;

    constructor(
        private apiService: ApiService,
        router: Router,
        private storageService: StorageService,
        private toastr: ToastrService) {
        this.router = router;
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

}