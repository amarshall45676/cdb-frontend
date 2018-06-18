import { Component, OnInit, Input  } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', '../../app.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() fileType: string;

  public fileUploaded = false; //File was uploaded while this page was loaded
  public fileBeingUploaded = false;

  public dataUploadResult: Object;

  constructor(
    private backendService: BackendService
  ) { }

  ngOnInit() {
  }

  public uploadData() {
    console.log("Uploading Data!");
    // Reset dataupload Result
    this.fileUploaded = false;
    this.dataUploadResult = null;
    var inputFile = (<HTMLInputElement>document.getElementById(this.fileType)).files[0]
    if (inputFile === undefined) {
      return
    }
    const fd = new FormData()
    fd.append("file", inputFile)
    const res = this.backendService.uploadFileGeneral(fd, this.fileType)
    this.fileUploaded = true;
    this.fileBeingUploaded = true;
    res.then(result => {
      console.log("Result Received: " + JSON.stringify(result))
      this.fileBeingUploaded = false;
      this.dataUploadResult = result;
    })
  }

}
