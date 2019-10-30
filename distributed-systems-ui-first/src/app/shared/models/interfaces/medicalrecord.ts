import { PatientInterface } from './patient';
import { DoctorInterface } from './doctor';
import { DrugInterface } from './drug';
import { IntakeIntervalInterface } from './intakeinterval';

export class MedicalrecordInterface {
    
    id: number;

    patient: PatientInterface;

    doctor: DoctorInterface;

    period: string;

    drugs: Array<DrugInterface>;

    intakeIntervals: Array<IntakeIntervalInterface>;

}
