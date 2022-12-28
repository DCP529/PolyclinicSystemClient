import { Guid } from "guid-typescript";
import { City } from "./City";
import { Doctor } from "./Doctor";

export class Polyclinic{
    polyclinicId: Guid | undefined;
    name!: string;
    address!: string;
    contactNumber!: number;
    image!: File;
    cityId!: Guid;
    doctorId!: Guid;
}