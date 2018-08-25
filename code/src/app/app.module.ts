import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule, MatIconModule, MatButtonModule } from '@angular/material';
import { CrudUsersComponent } from './crudUsers/crudUsers.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    CrudUsersComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [CrudUsersComponent]
})
export class AppModule { }
