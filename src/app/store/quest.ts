export class Quest {

    id: number;
    name: string;
    description: string;
    frequency: number;
    startDate: Date;
    endDate: Date;

    constructor() {
    }

    //muss dann von der jeweiligen Unterklasse implementiert werden
    public isWon(): boolean {
        return false;
    }
}