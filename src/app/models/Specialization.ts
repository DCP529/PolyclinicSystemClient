import { Guid } from "guid-typescript";

export class Specialization{
    specializationId: Guid | undefined;
    name: string | undefined;
    doctorId: Guid | undefined;
    experienceSpecialization: number | undefined;
}