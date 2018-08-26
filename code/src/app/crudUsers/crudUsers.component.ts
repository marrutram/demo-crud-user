import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from '../services/apiusers.service';
import {throwError} from 'rxjs';
import * as _ from 'lodash';
import {MatTableDataSource} from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './crudUsers.component.html',
  styleUrls: ['./crudUsers.component.scss']
})

export class CrudUsersComponent implements OnInit {
  dataUser = [];
  dataSource = new MatTableDataSource();
  displayedColumns = ['first_name', 'last_name', 'email', 'gender', 'address', 'enabled', 'action'];
  constructor(private apiUsersService:  ApiUsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  addUser() {
    const ELEMENT_DATA = {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      address: '',
      enabled: false,
      id: 0
    };
    this.dataUser.push(ELEMENT_DATA);
    this.refreshData();
  }

  changeEnabledUser(item, value) {
    item.enabled = value;
  }

  isEnabledUser(item) {
    return item.enabled === true;
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.dataUser);
  }

  saveUser(users) {
    users = _.omit(users, ['id']);
    this.apiUsersService.createrUser(users).pipe(first()).subscribe(users => {
      console.log(users);
    });
  }

  public getUsers() {
    this.apiUsersService.getUsers().pipe(first()).subscribe(users => {
      this.dataSource.data  = this.dataUser =  _.isEmpty(_.head(users)) ? [] : users;
    });
  }
}


