import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend/backend.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css', '../app.component.css']
})
export class DataUploadComponent implements OnInit {
  public fileUploaded = false; //File was uploaded while this page was loaded
  public fileBeingUploaded = false;

  public dataUploadResult: Object;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  public uploadData() {
    console.log("Uploading Data!");
    // Reset dataupload Result
    this.fileUploaded = false;
    this.dataUploadResult = null;
    var inputFile = (<HTMLInputElement>document.getElementById("file")).files[0]
    if (inputFile === undefined) {
      return
    }
    const fd = new FormData()
    fd.append("file", inputFile)
    const res = this.backendService.uploadFile(fd)
    this.fileUploaded = true;
    this.fileBeingUploaded = true;
    res.then(r => {
      console.log(r)
      if(r === "") {
        console.log("Returned an empty string!")
      }
      this.fileBeingUploaded = false;
      // const div = (<HTMLInputElement>document.getElementById("resultString"))
      // div.value = r;
      this.dataUploadResult = r;
    })
  }
}
