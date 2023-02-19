import { Brand } from "./brand";

export interface User{
    id: string,
    username: string;
    password: string,
    brands:Brand[],
    img:string;
}