import { Component, OnInit } from '@angular/core';

import {ProgramsService} from '../programs/programs.service';

import {BackendService} from '../backend/backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', '../app.component.css']
})
export class MainComponent implements OnInit {
  // private baseUrl = "http://localhost:4200";
  private baseUrl = "cdb.surge.sh";


  private fileUploaded = false; //File was uploaded while this page was loaded

  private fileBeingUploaded = false;

  private entitySelected: string;
  private entities: Array<Object> = [
    {
      name: "Students"
    },
    {
      name: "Projects"
    },
    {
      name: "Partners"
    },
    {
      name: "Affiliates"
    }
  ];

  private programs;

  constructor(
    private programsService: ProgramsService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.programsService.getProgramsPromise().then((programs) => {
      this.programs = programs;
    })
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
    this.fileUploaded = true;
    this.fileBeingUploaded = true;
    res.then(r => {
      console.log(r)
      if(r === "") {
        console.log("Returned an empty string!")
      }
      this.fileBeingUploaded = false;
      const div = (<HTMLInputElement>document.getElementById("resultString"))
      div.value = r;
    })
  }
  //
  // public createQuery() {
  //   console.log(this.entitySelected);
  //   if (this.entitySelected === "") {
  //     console.log("Need to select an entity to query")
  //   } else {
  //     window.location.href = "#/" + this.entitySelected.toLowerCase();
  //   }
  // }

  public viewProgram(programName) {
    console.log("Want to view: " + programName)
    //TODO: call the service method
    this.programsService.viewProfile(programName);
  }
}
