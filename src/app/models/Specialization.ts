import { Guid } from "guid-typescript";

export class Specialization{
    specializationId!: Guid;
    name!: string;
    doctorId!: Guid;
    experienceSpecialization!: number;
}