import { ValidTypesUser } from "../enums/valid-types-user";

export interface User {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    token?: String;
    role: ValidTypesUser;
}




