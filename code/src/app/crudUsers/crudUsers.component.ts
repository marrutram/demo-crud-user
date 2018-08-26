import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiUsersService } from '../services/apiusers.service';
import * as _ from 'lodash';
import {MatTableDataSource, MatSort} from '@angular/material';
import { first } from 'rxjs/operators';
import { User} from '../models/users.model';
import { AuthenticationService} from '../services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './crudUsers.component.html',
  styleUrls: ['./crudUsers.component.scss']
})

export class CrudUsersComponent implements OnInit  {
  dataUser = [];
  isErrorUser = false;
  dataSource = new MatTableDataSource();
  displayedColumns = ['first_name', 'last_name', 'email', 'gender', 'address', 'enabled', 'action'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiUsersService:  ApiUsersService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.dataSource.filterPredicate = this.getFilterMultiple();
  }

  getFilterMultiple() {
    return (data: User, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split('+');
      const columns = (<any>Object).values(data);
      filterArray.forEach(filter => {
        const customFilter = [];
        columns.forEach(column => customFilter.push(_.includes(_.lowerCase(column), filter)));
        matchFilter.push(customFilter.some(Boolean));
      });
      return matchFilter.every(Boolean);
    };
  }

  addUser() {
    if (!_.find(this.dataUser, {'id': 0})) {
      const ELEMENT_DATA = {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        address: '',
        enabled: false,
        id: 0
      };
      this.dataUser.splice(0, 0, ELEMENT_DATA);
      this.refreshData();
    }
  }

  changeEnabledUser(item, value) {
    if (item.id != 0) {
      const isActive = value ? 'activate' : 'deactivate';
      this.apiUsersService.activeUser(item.id, isActive).pipe(first()).subscribe(usersResp => {
        item.enabled = value;
      });
    } else {
      item.enabled = value;
    }
  }

  isEnabledUser(item) {
    return item.enabled === true;
  }

  refreshData() {
    this.dataSource.data = this.dataUser;
  }

  saveUser(users) {
    if (!this.isErrorUser) {
      users = _.omit(users, ['id']);
      this.apiUsersService.createrUser(users).pipe(first()).subscribe(usersResp => {
        const id =_.get(usersResp, 'id');
        if(!_.isUndefined(id)) {
          _.set(this.dataUser[0], 'id', id);
          this.refreshData();
        }
      });
    }
  }

  public getUsers() {
    this.apiUsersService.getUsers().pipe(first()).subscribe(users => {
      this.dataSource.data  = this.dataUser =  _.isEmpty(_.head(users)) ? [] : users;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilterUser(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  checkVerification(user, action) {
    const re = /\S+@\S+\.\S+/;
    this.isErrorUser = false;
    _.forEach(user, (value, key) => {
      switch (key) {
        case 'first_name':
          this.isErrorUser = _.isEmpty(value) || value.length < 3;
          break;
        case 'last_name':
          this.isErrorUser = _.isEmpty(value) || value.length < 3;
          break;
        case 'email':
          this.isErrorUser = _.isEmpty(value) || value.length < 3 || !re.test(value);
          break;
        case 'gender':
          this.isErrorUser = _.isEmpty(value) || value.length < 3;
          break;
        case 'address':
          this.isErrorUser = _.isEmpty(value) || value.length < 3;
          break;
        default:
      }
      if (this.isErrorUser) return false;
    });
    return this.isErrorUser ? 'disabled-save' : '';
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}


