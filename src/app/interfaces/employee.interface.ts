import { ValidTypesSex } from "../enums/valid-types-sexs.enum";
import { Positions } from './position.interface';

export interface Employee {
    _id?: string;
    rut: string;
    name: string;
    lastName: string;
    phone?: string;
    mail?: string;
    position?: any;
    sex: ValidTypesSex;
    contractStartDate?: Date;
    contractEndDate?: Date;
    address?: String;

}




