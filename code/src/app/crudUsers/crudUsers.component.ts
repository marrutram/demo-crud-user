import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiUsersService } from '../services/apiusers.service';
import * as _ from 'lodash';
import {MatTableDataSource, MatSort, MatDialog, MatDialogConfig} from '@angular/material';
import { first } from 'rxjs/operators';
import { User} from '../models/users.model';
import { AuthenticationService} from '../services';
import { Router } from '@angular/router';
import { ViewUserComponent }  from '../viewUser';

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

  constructor(private apiUsersService:  ApiUsersService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog) { }

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
        action: 'add',
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

  saveUser(user) {
    if(_.get(user, 'action') === 'add') {
      this.CreateUser(user);
    }
    if(_.get(user, 'action') === 'edit') {
      this.updateUser(user);
    }
  }

  CreateUser(user) {
    if (!this.isErrorUser) {
      const userParameter = _.pick(user, ['last_name', 'first_name', 'enabled', 'email', 'gender', 'address']);
      this.apiUsersService.createrUser(userParameter).pipe(first()).subscribe(userResp => {
        const id =_.get(userResp, 'id');
        if(!_.isUndefined(id)) {
          _.set(this.dataUser[0], 'id', id);
          this.refreshData();
        }
      });
    }
  }

  updateUser(user) {
    if (!this.isErrorUser) {
      const userParameter = _.pick(user, ['last_name', 'first_name', 'enabled', 'email', 'gender', 'address']);
      this.apiUsersService.updateUser(user.id, userParameter).pipe(first()).subscribe(userResp => {
        const id =_.get(userResp, 'id');
        if(!_.isUndefined(id)) {
          _.set(this.dataUser[0], 'id', id);
          _.set(user, 'action' , 'none');
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
          this.isErrorUser = _.isEmpty(value) || value.length < 8;
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

  deleteUser(user) {
    this.apiUsersService.deleteUser(user.id).pipe(first()).subscribe(userResp => {
      this.dataUser = _.remove(this.dataUser, users => users.id !== user.id);
      this.refreshData();
    });
  }

  isShowInput(user) {
    return _.get(user, 'action') === 'add' ||  _.get(user, 'action') === 'edit';
  }

  editUser(user) {
    const userClone = _.cloneDeep(user);
    _.set(user, 'copy' , userClone);
    _.set(user, 'action' , 'edit');
  }

  clearUser(user) {
    switch (_.get(user, 'action')) {
      case 'edit':
        let userCopy = _.get(user, 'copy');
        user.last_name = _.get(userCopy, 'last_name');
        user.first_name = _.get(userCopy, 'first_name');
        user.enabled = _.get(userCopy, 'enabled');
        user.email = _.get(userCopy, 'email');
        user.gender = _.get(userCopy, 'gender');
        user.address = _.get(userCopy, 'address');
        user.action = _.get(userCopy, 'address');
        _.set(user, 'action' , 'none');
        break;
      case 'add':
        _.remove(this.dataUser, users => users.id === user.id);
        this.refreshData();
        break;
      default:
    }
  }

  openViewUser(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.apiUsersService.viewUser(user.id).subscribe(users => {
      dialogConfig.data = users;
      this.dialog.open(ViewUserComponent, dialogConfig);
    });

  }
}


