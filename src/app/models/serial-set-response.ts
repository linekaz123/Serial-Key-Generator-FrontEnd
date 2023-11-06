import { SerialNumber } from "./serial-number";

export class SerialSetResponse {
    name!: string;
    quantity!: number;
    createdDate!: Date;
    serialNumberResponseList!: SerialNumber[]; 
  }