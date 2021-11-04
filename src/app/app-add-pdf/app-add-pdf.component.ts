import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-app-add-pdf',
  templateUrl: './app-add-pdf.component.html',
  styleUrls: ['./app-add-pdf.component.scss']
})
export class AppAddPdfComponent implements OnInit {


  public closeDialog(): void {
    this.dialogRef.close();
  }
  
  constructor(
    private dialogRef: MatDialogRef<AppAddPdfComponent>
  ) { }

  ngOnInit(): void {
  }
}
