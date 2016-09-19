"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Rx_1 = require('rxjs/Rx');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var posts_service_1 = require('./posts.service');
var users_service_1 = require('../users/users.service');
var spinner_component_1 = require('../shared/spinner.component');
var PostsComponent = (function () {
    function PostsComponent(_postsService, _userService) {
        this._postsService = _postsService;
        this._userService = _userService;
        this.pagedPosts = [];
        this.pageSize = 10;
    }
    PostsComponent.prototype.ngOnInit = function () {
        this.loadUsers();
        this.loadPosts();
    };
    // load posts
    PostsComponent.prototype.loadPosts = function (filter) {
        var _this = this;
        this.postsLoading = true;
        this._postsService.getPosts(filter)
            .subscribe(function (posts) {
            _this.posts = posts;
        }, null, function () { _this.postsLoading = false; });
    };
    // load users
    PostsComponent.prototype.loadUsers = function () {
        var _this = this;
        this._userService.getUsers()
            .subscribe(function (users) { return _this.users = users; });
    };
    // select comment fetch comments related to the selected post
    PostsComponent.prototype.select = function (post) {
        var _this = this;
        this.commentsLoading = true;
        this.currentPost = post;
        this._postsService.getComments(post.id)
            .subscribe(function (comments) {
            _this.currentPost.comments = comments;
            _this.commentsLoading = false;
        });
    };
    // reload posts per selected user
    PostsComponent.prototype.reloadPosts = function (filter) {
        this.currentPost = null;
        this.loadData(filter);
    };
    // loading posts and users. later move to facade
    PostsComponent.prototype.loadData = function (filter) {
        var _this = this;
        Rx_1.Observable.forkJoin(this._postsService.getPosts(filter), this._userService.getUsers())
            .subscribe(function (items) {
            _this.posts = items[0];
            _this.postsLoading = false;
            _this.users = items[1];
        });
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'posts',
            templateUrl: 'app/posts/posts.component.html',
            directives: [spinner_component_1.SpinnerComponent],
            providers: [posts_service_1.PostsService, http_1.HTTP_PROVIDERS, users_service_1.UsersService],
            styles: ["  \n    .posts li {\n      cursor: default;\n    }\n    \n    .posts li:hover {\n      background: #ecf0f1;\n    }\n    .list-group-item.active, \n    .list-group-item.active:hover, \n    .list-group-item.active:focus { \n      background-color: #ecf0f1;\n      border-color: #ecf0f1; \n      color: #2c3e50;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [posts_service_1.PostsService, users_service_1.UsersService])
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
//# sourceMappingURL=posts.component.js.map