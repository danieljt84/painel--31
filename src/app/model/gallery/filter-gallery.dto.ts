import { Product } from "../detail/Product";
import { Project } from "../project";
import { Promoter } from "../promoter";
import { Shop } from "../shop";

export interface FilterGalleryDTO{
    shop: Shop[];
    product: Product[];
    promoter: Promoter[];
    project: Project[];
    section: string[];
}