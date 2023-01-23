import { Guid } from "guid-typescript";
import { Doctor } from "./Doctor";

export class Polyclinic{
    polyclinicId!: Guid;
    name!: string;
    address!: string;
    contactNumber!: number;
    image: any;
    cityId!: Guid;
    doctors!: Doctor[];
}