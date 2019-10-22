import { DrugEffectInterface } from './drugeffect';

export interface DrugInterface {
    
    id: number;

    name: string;

    description: string;

    drugEffect: DrugEffectInterface;
}