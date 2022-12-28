import { Guid } from "guid-typescript";
import { Polyclinic } from "./Polyclinic";
import { Specialization } from "./Specialization";

export class Doctor{
    doctorId!: Guid;
    fio!: string;
    admissionCost!: number;
    contactNumber!: number;
    shortDescription!: string;
    fullDescription!: string;
    polyclinic!: Polyclinic;
    specializations!: Specialization[];
    image: any;
}