import { Guid } from "guid-typescript";
import { Polyclinic } from "./Polyclinic";

export class Doctor{
    doctorId: Guid | undefined;
    fio: string |undefined;
    admissionCost: number | undefined;
    contactNumber: number | undefined;
    shortDescription: string | undefined;
    fullDescription: string | undefined;
    polyclinic: Polyclinic | undefined;
}