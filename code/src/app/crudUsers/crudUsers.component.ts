import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './crudUsers.component.html',
  styleUrls: ['./crudUsers.component.scss']
})

export class CrudUsersComponent {
  dataSource : any = [];
  displayedColumns = ['first_name', 'last_name', 'email', 'gender', 'enabled', 'action'];
  constructor() { }
  
  ngOnInit() {
    this.dataSource = [];
  }
}
