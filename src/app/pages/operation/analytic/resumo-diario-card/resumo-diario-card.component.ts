import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { finalize, forkJoin } from 'rxjs';
import { Brand } from 'src/app/model/brand';
import { Config } from 'src/app/model/config';
import { Project } from 'src/app/model/project';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resumo-diario-card',
  templateUrl: './resumo-diario-card.component.html',
  styleUrls: ['./resumo-diario-card.component.scss']
})
export class ResumoDiarioCardComponent implements OnInit {
   private isLoading = true;
   private countComplete: number;
   private countDoing: number;
   private countMissing: number;
   private today: string;
   private brands: Brand[];
   private projects: Project[];

  constructor(private apiOperationService: ApiOperationService,private userService: UserService,private configService:ConfigService) { }

  ngOnInit(): void {
    this.getConfig();
    this.today = format(new Date(),'yyyy-MM-dd');
    this.loadDatas()
  }

  loadDatas(){
    this.isLoading = true;
    forkJoin({
      complete : this.apiOperationService.getCountActivityCompleteByBrand(this.brands.map(brand => brand.id),this.today),
      doing : this.apiOperationService.getCountActivityDoingByBrand(this.brands.map(brand => brand.id),this.today),
      missing : this.apiOperationService.getCountActivityMissingByBrand(this.brands.map(brand => brand.id),this.today)
    })
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(data =>{
      this.countComplete = data.complete;
      this.countDoing = data.doing;
      this.countMissing = data.missing
    })
  }

  getConfig(){
    this.configService.getConfig().subscribe(config => {
      this.brands = config.brands;
      this.projects = config.projects;
    })
  }

}
