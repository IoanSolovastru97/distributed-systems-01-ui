import { PatientInterface } from './patient';

export class CaregiverInterface {

    username: string;

    password: string;

    name: string;

    gender: string;

    birthdaty: string;

    address: string;

    role: string;

    patients: Array<PatientInterface>;
}