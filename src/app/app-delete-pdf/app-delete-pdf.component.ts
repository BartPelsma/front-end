import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-app-delete-pdf',
  templateUrl: './app-delete-pdf.component.html',
  styleUrls: ['./app-delete-pdf.component.scss']
})
export class AppDeletePdfComponent implements OnInit {

  public closeDialog(): void {
    this.dialogRef.close();
  }

  constructor(
    private dialogRef: MatDialogRef<AppDeletePdfComponent>
  ) { }

  ngOnInit(): void {
  }

}
