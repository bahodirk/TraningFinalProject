import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserFormComponent } from './user-form.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
// import { SpinnerComponent } from '../shared/index';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserFormComponent,
    UsersComponent
  ],
  providers: [UsersService]
})

export class UsersModule { }
