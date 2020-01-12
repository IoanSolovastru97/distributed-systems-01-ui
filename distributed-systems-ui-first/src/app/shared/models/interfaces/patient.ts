import { MedicalrecordInterface } from './medicalrecord';

/** Patient Interface */

export class PatientInterface {

  username: string;

  password: string;

  name: string;

  gender: string;

  birthdaty: string;

  address: string;

  role: string;

  // medicalRecord: MedicalRecordInterface[];
  medicalRecord: Array<MedicalrecordInterface>;

}
