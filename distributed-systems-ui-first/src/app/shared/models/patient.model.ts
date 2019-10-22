import { Injectable } from '@angular/core';
import { PatientInterface } from './interfaces/patient';

@Injectable()
export class PatientModel {
  /** will grab the list of all Patients */
  all: Array<PatientInterface>;

  /** will grab the username value of the selected Patient */
  selectedPatientUsername: string;

  setSelected(username: string) {
    return this.all.find((patient: PatientInterface) => patient.username === username);
  }

  removeSelected() {
    this.selectedPatientUsername = undefined;
  }

  clear() {
    this.removeSelected();
    this.all = undefined;
  }
}
