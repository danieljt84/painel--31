import { Project } from "../project";

export interface FilterDatatableDTO{
    shop: string[];
    product: string[];
    promoter: string[];
    project: Project[];
    status: string[];
}