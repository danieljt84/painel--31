import { Chain } from "@angular/compiler";
import { Product } from "./detail/Product";
import { Project } from "./project";
import { Promoter } from "./promoter";
import { Shop } from "./shop";

export interface Filter{
    projects?:Project[],
    shops?:Shop[],
    promoters?:Promoter[],
    chains?:Chain[],
    products?:Product[]
}