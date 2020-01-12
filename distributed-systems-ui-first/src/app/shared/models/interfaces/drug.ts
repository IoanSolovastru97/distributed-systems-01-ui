import { DrugEffectInterface } from './drugeffect';

export class DrugInterface {
    
    id: number;

    name: string;

    description: string;

    drugEffect: DrugEffectInterface;
}