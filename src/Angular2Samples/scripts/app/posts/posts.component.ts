import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'posts',
  templateUrl: 'app/posts/posts.component.html',
  styles: [`  
    .posts li {
      cursor: default;
    }
    
    .posts li:hover {
      background: #ecf0f1;
    }
    .list-group-item.active, 
    .list-group-item.active:hover, 
    .list-group-item.active:focus { 
      background-color: #ecf0f1;
      border-color: #ecf0f1; 
      color: #2c3e50;
    }
  `]
})

export class PostsComponent implements OnInit {
  postsLoading;
  commentsLoading;
  currentPost;
  
  posts: any[];
  users: any[];
  pagedPosts = [];

  pageSize = 10;

  constructor(
    private _postsService: PostsService,
    private _userService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
    this.loadPosts();
  }

  // load posts
  private loadPosts(filter?) {
    this.postsLoading = true;
    this._postsService.getPosts(filter)
      .subscribe(posts => {
        this.posts = posts;
      },
      null,
      () => { this.postsLoading = false; });
  }

  // load users
  private loadUsers() {
    this._userService.getUsers()
      .subscribe(users => this.users = users);
  }

  // select comment fetch comments related to the selected post
  select(post) {
    this.commentsLoading = true;
    this.currentPost = post;
    this._postsService.getComments(post.id)
      .subscribe(comments => {
        this.currentPost.comments = comments
        this.commentsLoading = false;
      });
  }

  // reload posts per selected user
  reloadPosts(filter) {
    this.currentPost = null;

    this.loadData(filter);
  }

  // loading posts and users. later move to facade
  private loadData(filter?) {
    Observable.forkJoin(
      this._postsService.getPosts(filter),
      this._userService.getUsers())
      .subscribe(items => {
        this.posts = items[0];
        this.postsLoading = false;
        this.users = items[1];
      });
  }
}