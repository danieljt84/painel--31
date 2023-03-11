import { Chain } from "@angular/compiler";
import { Project } from "../project";
import { Shop } from "../shop";

export interface FilterActivationDTO{
    shop: Shop[];
    project: Project[];
    chain: Chain[];
    
}