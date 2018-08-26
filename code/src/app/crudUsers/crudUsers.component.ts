import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from '../services/apiusers.service';
import {throwError} from 'rxjs';

@Component({
  templateUrl: './crudUsers.component.html',
  styleUrls: ['./crudUsers.component.scss']
})

export class CrudUsersComponent implements OnInit {
  dataSource : any = [];
  displayedColumns = ['first_name', 'last_name', 'email', 'gender', 'enabled', 'action'];
  constructor(private apiUsersService:  ApiUsersService) { }
  
  ngOnInit() {
    this.dataSource = [];
    this.getUsers();
  }

  public getUsers(){
      this.apiUsersService.getUsers().subscribe((data:  Array<object>) => {
          this.dataSource  =  data;
          console.log(data);
      });
  }
}
