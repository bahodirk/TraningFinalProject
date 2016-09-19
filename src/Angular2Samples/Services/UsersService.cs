using System;
using System.Collections.Generic;
using System.Linq;
using MyAngularCoreProject.Models;
using Newtonsoft.Json;

namespace MyAngularCoreProject.Services {
  public interface IUserService {
    List<User> getUsers();
    List<User> getUserById(int i);
    void updateUser(User user);
    void addUser(User user);
    void deleteUser(int userId);

  }
  public class UsersService : IUserService {
    private string _jsonPath = @"c:\test\users.json";
    private List<User> _user;
    UserObject users;
    private readonly string _json;
    public UsersService() {
      if (_json == null) {
        _json = System.IO.File.ReadAllText(_jsonPath);

      }
      if (_user == null) {
        users = JsonConvert.DeserializeObject<UserObject>(_json);
        _user = users.Users;
      }

    }
    public List<User> getUsers() {
      return _user;
    }
    public List<User> getUserById(int id) {
      var user = _user.Where(u => u.id == id).ToList();
      return user;
    }



    public void addUser(User user) {

      _user.Add(new User {
        name = user.name,
        phone = user.phone,
        username = user.username,
        website = user.website,
        address = user.address,
        company = user.company,
        email = user.email
      });


    }


    public void deleteUser(int userId) {
      _user.RemoveAll(r => r.id == userId);
    }

    public void updateUser(User user) {
      if (user == null) { return; }
      try {
        _user.Where(req => req.id == user.id).ToList().ForEach(item => {
          item.name = user.name;
          item.phone = user.phone;
          item.username = user.username;
          item.website = user.website;
          item.address = user.address;
          item.company = user.company;
          item.email = user.email;
        });

        var jsonString = JsonConvert.SerializeObject(_user);
        if (jsonString != null) {
          System.IO.File.WriteAllText(_jsonPath, jsonString);
        }
      } catch (Exception) { throw; }
    }
  }
}


