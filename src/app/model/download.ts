import { Observable } from "rxjs";

export interface Download{
    observable:Observable<any>
    filename:string;
    type:string
}