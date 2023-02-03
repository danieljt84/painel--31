import { Component,ElementRef,OnInit, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user:User;
  @ViewChild("sidebar") sidebar: ElementRef;
  @ViewChild("content") content: ElementRef;
  constructor(private elRef: ElementRef, private renderer: Renderer2 ,private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.obterUsuarioLogado;
  }

  openSideBar(){
    const active = this.sidebar.nativeElement.classList.contains('open');
    this.renderer[active ? 'removeClass' : 'addClass'](this.sidebar.nativeElement, 'open');
    this.renderer[active ? 'removeClass' : 'addClass'](this.content.nativeElement, 'open');
  }

  logout(){
    this.userService.deslogar();
  }
  
  isLogin():boolean{
    return this.userService.logado
  }


}
