import { Component, OnInit, Input  } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', '../../app.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() fileType: string;

  public fileUploaded = false; // File was uploaded while this page was loaded
  public fileBeingUploaded = false;

  public dataUploadResult: Object;

  constructor(
    private backendService: BackendService) {}

  ngOnInit() {
  }

  // Gets the file that wants to be uploaded and adds it to form data before calling backend to upload it
  public uploadData() {
    // Reset dataupload Result
    this.fileUploaded = false;
    this.dataUploadResult = null;
    // Get file
    const inputFile = (<HTMLInputElement>document.getElementById(this.fileType)).files[0];
    if (inputFile === undefined) {
      return;
    }
    // Add to form data
    const fd = new FormData();
    fd.append('file', inputFile);
    // Upload the file
    const res = this.backendService.uploadFileGeneral(fd, this.fileType);
    this.fileUploaded = true;
    this.fileBeingUploaded = true;
    res.then(result => {
      this.fileBeingUploaded = false;
      this.dataUploadResult = result;
    });
  }

}
