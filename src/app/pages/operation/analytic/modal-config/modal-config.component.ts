import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Brand } from 'src/app/model/brand';
import { Project } from 'src/app/model/project';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/model/config';


@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {

  private initialDate:FormControl;
  private finalDate:FormControl;
  brands: Brand[];
  projects: Project[];
  private itensSelecteds = new Map<string, Object[]>();
  private destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(public activeModal: NgbActiveModal,private configService:ConfigService) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this.configService.getUser().subscribe(config =>{
      this.initialDate.setValue(config.initialDate);
      this.finalDate.setValue(config.initialDate);
      this.brands = config.brands;
      this.projects = config.projects;
    })
  }

  //Emite evento quando um campo é filtrado
  setConfig(){
    let config:Config = {
      brands: this.itensSelecteds.has('brand')? this.itensSelecteds.get('brand') as Brand[] : this.brands,
      projects: this.itensSelecteds.has('project')? this.itensSelecteds.get('project') as Project[] : this.projects,
      initialDate: this.initialDate.value,
      finalDate: this.finalDate.value
    }
    this.configService.setUser(config);
  }

  //funcao que ouve o evento "set-item"
  //recebe todos os dados selecionados, classificado pelos ids
  eventListenerSetItem() {
    EventEmiterService.get('set-item')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        if ((item.type = 'config')) {
          this.loadItensSelected(item);
        }
      });
  }

  loadItensSelected(item: any) {
    if (item.itens.length == 0) {
      if (this.itensSelecteds.has(item.id)) {
        this.itensSelecteds.get(item.id).length = 0;
        this.itensSelecteds.delete(item.id);
      }
    } else {
      if (this.itensSelecteds.has(item.id)) {
        this.itensSelecteds.get(item.id).length = 0;
        this.itensSelecteds.get(item.id).push(...item.itens);
      } else {
        this.itensSelecteds.set(item.id, item.itens);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
