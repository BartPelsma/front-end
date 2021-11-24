import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-app-add-pdf',
  templateUrl: './app-add-pdf.component.html',
  styleUrls: ['./app-add-pdf.component.scss']
})
export class AppAddPdfComponent implements OnInit {
  fileName: any;


  public closeDialog(): void {
    this.dialogRef.close();
  }
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppAddPdfComponent>
  ) { }

  onClickAddPDF(): void {
    const element = document.getElementById('PDFInput') as HTMLElement;
    element.click();
  }

  onFileSelected(fileInput: any){
    let file = fileInput.target.files[0];
    this.fileName = file.name;
  }

  ngOnInit(): void {
  }
}
