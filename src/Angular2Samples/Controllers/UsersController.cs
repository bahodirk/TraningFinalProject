using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyAngularCoreProject.Models;
using MyAngularCoreProject.Services;

namespace MyAngularCoreProject.Controllers {
  [Route("api/[controller]")]
  public class UsersController : Controller {

    private IUserService _usersService;
    public UsersController(IUserService userService) {
      _usersService = userService;
    }
    [HttpGet]
    public List<User> GetUsers() {
      return _usersService.getUsers();
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public List<User> GetById(int id) {
      return _usersService.getUserById(id);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]User user) {
      //this.ModelState.IsValid
      _usersService.addUser(user);

    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]User user) {
      _usersService.updateUser(user);
    }

    // DELETE api/users/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
      // route back to posts page, so it can refresh the page with new value
     _usersService.deleteUser(id);
      return Ok(id);
    }
  }
}
