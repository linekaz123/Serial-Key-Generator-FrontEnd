import { SerialNumber } from "./serial-number";

export class SerialSet {
    id!: number;
    name!: string;
    quantity!: number;
    createdDate!: Date;
    configuration!: boolean;
    serialLength!: number;
    numbers!: boolean;
    upperCase!: boolean;
    lowerCase!: boolean;
    exclusions!: string;
    serialNumbers!: SerialNumber[];
}