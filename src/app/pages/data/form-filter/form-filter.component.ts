import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { format, subDays } from 'date-fns';
import { finalize, takeWhile } from 'rxjs';
import { FilterDatatableDTO } from 'src/app/model/detail/filter-datatable.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit, OnDestroy {
  alive: boolean = true
  valuesToFilter: FilterDatatableDTO;
  initialDate: FormControl;
  finalDate: FormControl;


  constructor(private apiService: ApiService) { }
 

  ngOnInit(): void {
    this.finalDate = new FormControl();
    this.finalDate.setValue(formatDate(new Date(),'yyyy-MM-dd','en'));
    this.initialDate = new FormControl(formatDate(subDays(new Date(),7),'yyyy-MM-dd','en'));
  }

  loadValuesToFilter(){
    
  }

  ngOnDestroy(): void {
    this.alive = false
  }
}
