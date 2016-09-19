using System.Collections.Generic;
using System.Linq;
using MyAngularCoreProject.Models;
using Newtonsoft.Json;

namespace MyAngularCoreProject.Services {
  public interface IPostService {
    List<Post> getPosts();
    List<Post> getById(int id);
    List<Comment> getCommentsByPostId(int postId);
  }


  public class PostsService : IPostService {

    private List<Post> _posts;
    PostObject post;
    private readonly string jsonPosts, jsonComments;
    public PostsService() {
      if (jsonPosts == null) {
        jsonPosts = System.IO.File.ReadAllText(@"c:\test\posts.json");
        jsonComments = System.IO.File.ReadAllText(@"c:\test\comments.json");
      }
      if (_posts == null) {
        post = JsonConvert.DeserializeObject<PostObject>(jsonPosts);
        _posts = post.Posts;
      }
    }
    public List<Post> getPosts() {
      
      return _posts;
    }

    public List<Post> getById(int id) {
      return _posts.Where(posts => posts.id == id).ToList();
    }

    public List<Comment> getCommentsByPostId(int postId) {
      var data = JsonConvert.DeserializeObject<CommentObject>(jsonComments).Comments;
      return data.Where(comments => comments.postId == postId).ToList();
    }
  }
}
