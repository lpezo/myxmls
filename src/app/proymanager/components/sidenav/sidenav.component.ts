import { Component, OnInit, NgZone } from '@angular/core';
import { ProyService } from '../../services/proy.service';
import { Observable } from 'rxjs';
import { Proy } from '../../models/proy';
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  proys: Observable<Proy[]>;
  isIndigoTheme: boolean = false;
  dir: string = 'ltr';
  constructor(zone: NgZone, private proyService: ProyService, private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
   }

  ngOnInit() {
    
  }

  isScreenSmall(): boolean{
    return this.mediaMatcher.matches;
  }

  toggleDir(){
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  }
