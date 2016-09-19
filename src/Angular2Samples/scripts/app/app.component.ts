import { Component } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { PostsComponent } from './posts/posts.component';


@Component({
  selector: 'my-app',
  template: `
  <navbar></navbar>
  <div class="container">
    <router-outlet></router-outlet>  
  </div>`,
})

export class AppComponent { }