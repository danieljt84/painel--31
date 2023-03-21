import { Chain } from "@angular/compiler";
import { Product } from "./detail/Product";
import { Project } from "./project";
import { Promoter } from "./promoter";
import { Shop } from "./shop";

export interface Filter{
    brands?:number[],
    projects?:number[],
    shops?:number[],
    promoters?:number[],
    chains?:number[],
    products?:number[]
}