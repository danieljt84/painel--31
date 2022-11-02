import { Component,ElementRef,OnInit, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username="";
  @ViewChild("sidebar") sidebar: ElementRef;
  @ViewChild("content") content: ElementRef;
  constructor(private elRef: ElementRef, private renderer: Renderer2 ,private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.userService.obterUsuarioLogado.username
  }

  openSideBar(){
    const active = this.sidebar.nativeElement.classList.contains('open');
    this.renderer[active ? 'removeClass' : 'addClass'](this.sidebar.nativeElement, 'open');
    this.renderer[active ? 'removeClass' : 'addClass'](this.content.nativeElement, 'open');
  }

  
  isLogin():boolean{
    return this.userService.logado
  }


}
