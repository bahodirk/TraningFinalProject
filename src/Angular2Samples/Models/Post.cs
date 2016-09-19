using System.Collections.Generic;
namespace MyAngularCoreProject.Models {


  /*public Posts(string json) {
    JObject jObject = JObject.Parse(json);
    JToken jPosts = jObject["Posts"];
    userId = (int)jPosts["userId"];
    Id = (int)jPosts["Id"];
    title = (string)jPosts["title"];
    body = (string)jPosts["body"];

  }*/
  public class Post {
    public int userId { get; set; }
    public int id { get; set; }
    public string title { get; set; }
    public string body { get; set; }
  }

  public class PostObject {
    public List<Post> Posts { get; set; }
  }

}
