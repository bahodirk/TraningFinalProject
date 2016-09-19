import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';

import { UsersModule, routes as users_routes } from './users/users.module';
import { PostsModule, routes as posts_routes } from './posts/posts.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserFormComponent } from './users/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'notfound', component: NotFoundComponent }
  // { path: '/*other', redirectTo: 'home' }
  // { path: 'users', loadChildren: 'app/users/users.module'},
  // { path: 'posts', loadChildren: 'app/posts/posts,module'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes
      .concat(users_routes)
      .concat(posts_routes)),
    SharedModule,
    UsersModule,
    PostsModule
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
