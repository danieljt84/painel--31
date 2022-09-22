import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { finalize, forkJoin } from 'rxjs';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resumo-diario-card',
  templateUrl: './resumo-diario-card.component.html',
  styleUrls: ['./resumo-diario-card.component.scss']
})
export class ResumoDiarioCardComponent implements OnInit {
   isLoading = true;
   countComplete: number;
   countDoing: number;
   countMissing: number;
   today: string;

  constructor(private apiOperationService: ApiOperationService,private userService: UserService) { }

  ngOnInit(): void {
    this.today = format(new Date(),'yyyy-MM-dd');
    this.loadDatas()
  }

  loadDatas(){
    forkJoin({
      complete : this.apiOperationService.getCountActivityCompleteByBrand(this.userService.obterUsuarioLogado.brand.name,this.today),
      doing : this.apiOperationService.getCountActivityDoingByBrand(this.userService.obterUsuarioLogado.brand.name,this.today),
      missing : this.apiOperationService.getCountActivityMissingByBrand(this.userService.obterUsuarioLogado.brand.name,this.today)
    })
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(data =>{
      this.countComplete = data.complete;
      this.countDoing = data.doing;
      this.countMissing = data.missing
    })
  }

}
