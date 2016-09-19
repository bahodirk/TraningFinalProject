import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { User} from './user';

@Component({
  selector: 'users',
  templateUrl: 'app/users/users.component.html'
})

export class UsersComponent implements OnInit {
  isLoading = true;
  users: any[];

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this._usersService.getUsers()
      .subscribe(users => {
        this.users = users
        this.isLoading = false;
      });
  }

  deleteUser(user) {
    if (confirm('Do you realy want to delete ' + user.name + '?')) {
      let index = this.users.indexOf(user);

      this._usersService.deleteUser(user.id)
        .subscribe(null,
        error => {
          alert('could not delete the user');
          this.users.splice(index, 0, user);
        }, 
        () => this.users.splice(index, 1));
    }
  }
}
