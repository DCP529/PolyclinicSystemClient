import { Guid } from "guid-typescript";

export class City{
    id: Guid | undefined;
    name: string | undefined;
    fio: string | undefined;
    contactNumber: number | undefined;
    image: string | undefined;
    shortDescription: string | undefined;
    fullDescription: string | undefined;
}