import { Brand } from "./brand";
import { DetailProducts } from "./detail/detail-data";
import { Photo } from "./gallery/photo";
import { Project } from "./project";
import { Promoter } from "./promoter";
import { Shop } from "./shop";

export interface DataFile{
  id:number;
  data:string;
  brand:Brand;
  project:Project;
  shop:Shop;
  promoter:Promoter;
  photos:Photo[];
  detailProducts:DetailProducts[];
}
