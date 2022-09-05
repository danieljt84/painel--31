import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavComponent } from "./nav.component";

@NgModule({
    declarations:[NavComponent],
    imports:[CommonModule],
    exports:[NavComponent],
    providers: [],
})
export class NavModule{}