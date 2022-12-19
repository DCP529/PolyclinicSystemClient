import { Guid } from "guid-typescript";
import { City } from "./City";

export class Polyclinic{
    polyclinicId: Guid | undefined;
    name: string | undefined;
    address: string | undefined;
    contactNumber: number | undefined;
    image: File | undefined;
    city: City | undefined
}