import { Brand } from "./brand";

export interface User{
    id: string,
    username: string;
    password: string,
    brand:Brand,
    img:string;
}