import { Brand } from "./brand";
import { Project } from "./project";

export interface Config {
  initialDate: Date;
  finalDate: Date;
  brands: Brand[];
  projects: Project[];
}
