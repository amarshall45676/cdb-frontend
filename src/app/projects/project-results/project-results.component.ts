import { Component, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {ProjectComponent} from '../project/project.component';


@Component({
  selector: 'app-project-results',
  templateUrl: './project-results.component.html',
  styleUrls: ['./project-results.component.css']
})
export class ProjectResultsComponent implements OnInit {
  private sub;
  public queryString;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log("Init for project component")
    this.sub = this.route.params.subscribe(params => {
       const program = params['program'];
       const partner = params['partner'];
       const semester = params['semester']
       const yearStart = params['yearStart'];
       const yearEnd = params['yearEnd'];

       if (!program) {
         this.queryString = "project/"
       } else {
         this.queryString =
          "project/" +
           program + "/" +
           partner + "/" +
           semester  + "/" +
           yearStart + "/" + yearEnd;         
       }

    });
  }

  //TODO: on destory?

}
