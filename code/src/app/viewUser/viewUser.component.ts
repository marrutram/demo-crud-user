import { Component,  Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  templateUrl: './viewUser.component.html',
  styleUrls: ['./viewUser.component.scss']
})
export class ViewUserComponent {
    dataUser: object;
    constructor(
      private dialogRef: MatDialogRef<ViewUserComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      this.dataUser = data;
    }
    close() {
        this.dialogRef.close();
    }
}
