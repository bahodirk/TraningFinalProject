import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';

export const routes: Routes = [
  { path: 'posts', component: PostsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostsComponent],
  providers: [PostsService]
})

export class PostsModule { }
