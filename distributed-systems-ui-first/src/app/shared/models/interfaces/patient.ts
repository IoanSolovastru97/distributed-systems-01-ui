import { MedicalRecordInterface } from './medicalrecord';

/** Patient Interface */

export interface PatientInterface {

  username: string;

  password: string;

  name: string;

  gender: string;

  birthdaty: string;

  address: string;

  role: string;
  
  // medicalRecord: MedicalRecordInterface[];
  medicalRecord: Array<MedicalRecordInterface>;

}
