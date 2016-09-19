using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyAngularCoreProject.Models;
using MyAngularCoreProject.Services;

namespace MyAngularCoreProject.Controllers {
  [Route("api/[controller]")]
  public class PostsController : Controller {

    private IPostService _postsService;
    public PostsController(IPostService postService) {
      _postsService = postService;
    }

    [HttpGet]
    public List<Post> Get() {
      return _postsService.getPosts();
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public List<Post> GetById(int id) {
      return _postsService.getById(id);
    }

    // GET api/values/5/comments
    [Route("{id}/comments")]
    public List<Comment> GetCommentsByPostId(int id) {
      return _postsService.getCommentsByPostId(id);
    }

  }
}
