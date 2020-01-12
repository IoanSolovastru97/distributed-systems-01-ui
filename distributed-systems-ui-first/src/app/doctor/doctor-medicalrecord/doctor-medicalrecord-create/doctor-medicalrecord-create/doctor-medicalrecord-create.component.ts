import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorInterface } from 'src/app/shared/models/interfaces/doctor';
import { Router } from '@angular/router';
import { MedicalrecordInterface } from 'src/app/shared/models/interfaces/medicalrecord';
import { IntakeIntervalInterface } from 'src/app/shared/models/interfaces/intakeinterval';
import { DrugInterface } from 'src/app/shared/models/interfaces/drug';
import { PatientInterface } from 'src/app/shared/models/interfaces/patient';

@Component({
  selector: 'app-DoctorMedicalrecordCreate',
  templateUrl: './Doctor-medicalrecord-create.component.html',
  styleUrls: ['./Doctor-medicalrecord-create.component.scss']
})
export class DoctorMedicalrecordCreateComponent implements OnInit {


  public medicalrecordData: MedicalrecordInterface = new MedicalrecordInterface();

  public selectedInterval: string;
  public selectedDrug: string;
  public selectedPatient: string;
  public selectedDoctor: string;

  private router: Router;


  public intakeArray: IntakeIntervalInterface[];
  public drugArray: DrugInterface[];

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    router: Router,
    private toastr: ToastrService) {
    this.router = router;
  }

  ngOnInit(): void {
    this.apiService.getIntakeIntervals().subscribe(
      /** On Success */
      (data: IntakeIntervalInterface[]) => {
        this.intakeArray = data;
      },
      /** On Error */
      (error: HttpErrorResponse) => {
      },
    );

    this.apiService.getDrugs().subscribe(
      /** On Success */
      (data: DrugInterface[]) => {
        this.drugArray = data;
      },
      /** On Error */
      (error: HttpErrorResponse) => {
      },
    );
  }


  public onMedicalrecordCancel(): void {
    this.router.navigate(['/doctor/medicalrecord'])
  }

  save() {
    //intake
    console.log(this.intakeArray);
    // let saveIntakeInterval: IntakeIntervalInterface;
    // for (let i = 0; i < this.intakeArray.length; i++) {

    //   if (this.intakeArray[i].startInterval === this.selectedInterval.split('-')[0]) {
    //     console.log(this.intakeArray[i]);
    //     saveIntakeInterval = this.intakeArray[i];
    //   }
    // }

    // //drug
    // console.log(this.drugArray);
    // let saveDrug: DrugInterface;
    // for (let i = 0; i < this.drugArray.length; i++) {

    //   if (this.drugArray[i].name === this.selectedDrug) {
    //     saveDrug = this.drugArray[i];
    //   }
    // }

    this.findDoctor();
    this.findPatient();

    // this.medicalrecordData.drugs = [saveDrug];
    // this.medicalrecordData.intakeIntervals = [saveIntakeInterval];


    this.medicalrecordData.drugs = this.drugArray;
    this.medicalrecordData.intakeIntervals = this.intakeArray;

    console.log("createMedicalrecordDetails()", this.medicalrecordData);
    console.log("createMedicalrecordDetails() patient", this.medicalrecordData.patient);
    console.log("createMedicalrecordDetails() doctor", this.medicalrecordData.doctor);
    // console.log("******", saveDrug.id);
    // console.log("******", saveIntakeInterval.id);
    this.apiService.createMedicalrecordDetails(this.medicalrecordData).subscribe(
      (data: number) => {
        console.log("Medicalrecord saved");
        this.router.navigate(['/doctor/medicalrecord'])
      },
      (error: HttpErrorResponse) => {
      },
    );
  }

  findDoctor(): void {
    this.apiService.getDoctorDetails(this.selectedDoctor).subscribe(
      (data: DoctorInterface) => {
        console.log("success");
        this.medicalrecordData.doctor = data;
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }
  // getPatientDetailsDoctor

  findPatient(): void {
    this.apiService.getPatientDetailsDoctor(this.selectedPatient).subscribe(
      (data: PatientInterface) => {
        console.log("success");
        this.medicalrecordData.patient = data;
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }



}
