import { DetailProducts } from "./detail-data";

export class DataFileDetails{
  brand:string
  data:string;
  project:string;
  chain:string;
  shop:string;
  promoter:string;
  details: DetailProducts[];
  expanded:boolean = false;
}
