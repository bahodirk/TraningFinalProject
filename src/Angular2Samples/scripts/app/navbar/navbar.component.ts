import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: 'app/navbar/navbar.component.html'
})


export class NavbarComponent{

  constructor(public router: Router){}
}
