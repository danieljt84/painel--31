import { Brand } from "./brand";
import { Project } from "./project";

export interface User{
    id: string,
    username: string;
    password: string,
    brands:Brand[],
    projects:Project[],
    img:string;
}