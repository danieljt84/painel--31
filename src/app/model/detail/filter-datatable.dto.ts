import { Project } from "../project";

export interface FilterDatatableDTO{
    brands: string[];
    shop: string[];
    product: string[];
    promoter: string[];
    project: Project[];
    status: string[];
}