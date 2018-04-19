import { Component, OnInit, ViewChild } from '@angular/core';

import { ProgramsService } from '../programs.service';

import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-program-results',
  templateUrl: './program-results.component.html',
  styleUrls: ['./program-results.component.css']
})
export class ProgramResultsComponent implements OnInit {
  private program;
  // private issue;
  private semester;

  private yearStart;
  private yearEnd;

  private sub;

  private programs: Array<Object>; //all programs
  private dataSource: MatTableDataSource<Object>;
  private displayedColumns = ['name', 'purpose', 'activityType', 'profile'];
  private programsService: ProgramsService;
  private backendService: BackendService;

  public programViews;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    pProgramsService: ProgramsService,
    pBackendService: BackendService,
    private route: ActivatedRoute
  ) {
    this.programsService = pProgramsService;
    this.backendService = pBackendService;
   }

  ngOnInit() {
    console.log("Init for program component")
    this.sub = this.route.params.subscribe(params => {
       this.program = params['program'];
       // this.issue = params['issue'];
       this.semester = params['semester']
       this.yearStart = params['yearStart'];
       this.yearEnd = params['yearEnd'];

       this.submitQuery();
    });
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(id) {
    this.programsService.viewProfile(id);
  }

  public submitQuery() {
    const program = this.program;
    // const issue = this.issue;
    const semester = this.semester;
    const yearStart = this.yearStart;
    const yearEnd = this.yearEnd;
    const resultsPromise = this.makeQuery("GET",
     "program/" +
      program + "/" +
      // issue + "/" +
      semester  + "/" +
       yearStart + "/" + yearEnd
     );
    resultsPromise.then(results =>
      {
        console.log(JSON.stringify(results))
        results.forEach(result => {
          result["profile"] = result["name"]
        })
        this.programs = results;
        this.dataSource = new MatTableDataSource(results)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  //TODO: refactor somewhere
  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null)
  }

}
