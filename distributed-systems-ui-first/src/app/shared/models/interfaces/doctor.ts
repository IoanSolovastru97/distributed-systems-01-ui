import { PatientInterface } from './patient';
import { MedicalrecordInterface } from './medicalrecord';

export class DoctorInterface {
    
    username: string;

    password: string;

    name: string;

    gender: string;

    birthdaty: string;

    address: string;

    role: string;

    patients: Array<PatientInterface>;

    medicalRecord: Array<MedicalrecordInterface>;
}