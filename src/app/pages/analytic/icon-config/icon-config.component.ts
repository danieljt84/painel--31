import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfigComponent } from '../modal-config/modal-config.component';


@Component({
  selector: 'app-icon-config',
  templateUrl: './icon-config.component.html',
  styleUrls: ['./icon-config.component.scss']
})
export class IconConfigComponent implements OnInit {

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModalConfig(){
    this.modalService.open(ModalConfigComponent)
  }

}
