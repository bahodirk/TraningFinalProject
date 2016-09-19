import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BaseValidators } from '../shared/index';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  templateUrl: 'app/users/user-form.component.html'
})

export class UserFormComponent implements CanDeactivate<any>, OnInit {
  public form: FormGroup;
  public user = new User();
  public tempUser: any[];
  public title: string;
  private subscription: Subscription;

  constructor(
    fb: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _routerParam: ActivatedRoute) {
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required, BaseValidators.incorrectEmailFormat])),
      'phone': new FormControl(),
      'address': fb.group({
        'street': [],
        'suite': [],
        'city': [],
        'zipcode': []
      })
    });
  }

  ngOnInit() {
    let id;
    this.subscription = this._routerParam.params.subscribe((param: any) => {
      id = param['id']
    });

    this.title = id ? 'Edit User' : 'New User';

    if (!id) {
      return;
    }

    this._userService.getUser(id)
      .subscribe(
      (user: User) => {
        this.user = user[0];
      },
      response => {
        if (response.status === 404) {
          this._router.navigate(['NotFound']);
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  canDeactivate() {
    if (this.form.dirty) {
      return confirm('You have not saved data. Are you sure to leave?');
    }
    return true;
  }

  save() {
    let result;
    // after press Save this warn should not appear. markAsPersistante
    if (this.user.id) {
      this._userService.updateUser(this.user)
        .subscribe(r => {
          this.form.pristine = true;
          this._router.navigate(['users']);
        })
    }
    else {
      result = this._userService.addUser(this.user);
      result.subscribe(r => {
        this.form.pristine = true
        this._router.navigate(['Users']);
      })
    }
  }
} 