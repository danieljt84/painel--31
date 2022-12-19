import { DataActivity } from "./data-activity"

export interface Bonus{
  id:number,
  responsible:string,
  createdAt:string,
  finishedAt:string,
  daysInWeek:number,
  price:number
  datasActivity:DataActivity[]
}
