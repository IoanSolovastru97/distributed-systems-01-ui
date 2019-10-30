export class IntakeIntervalInterface {

    id: number;

    startInterval: string;

    endInterval: string;

    constructor(id: number, start: string, end: string) {
        this.id = id;
        this.startInterval = start;
        this.endInterval = end;
    }
}