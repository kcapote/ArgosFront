import { ValidTypesFloors } from "../enums/valid-types-floors";

export interface Floors {
    _id?: string;
    project: any;
    number: number;
    quantityDepartment: number;
    type: ValidTypesFloors;
    status?: number;
}
