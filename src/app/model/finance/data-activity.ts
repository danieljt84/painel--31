import { Shop } from "../shop";
import { Activity } from "./activity";

export interface DataActivity{
    id:number,
    shop:Shop,
    activity:Activity,
    price:number,
    hoursContracted:number
    daysInWeekContracted:number
}
