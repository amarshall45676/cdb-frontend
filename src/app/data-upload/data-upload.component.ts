import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend/backend.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }


    public uploadData() {
      console.log("Uploading Data!");
      var inputFile = (<HTMLInputElement>document.getElementById("file")).files[0]
      if (inputFile === undefined) {
        return
      }
      const fd = new FormData()
      fd.append("file", inputFile)
      const res = this.backendService.uploadFile(fd)
      res.then(r => {
        console.log(r)
        if(r === "") {
          console.log("Returned an empty string!")
        }
        const div = (<HTMLInputElement>document.getElementById("resultString"))
        div.value = r;
      })
    }

}
