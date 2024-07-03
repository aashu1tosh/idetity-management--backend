import { ROLE } from '../constant/enum';

export interface UserCredentials {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    role: ROLE;
}

export interface ILogin {
    email: string;
    password: string;
}
