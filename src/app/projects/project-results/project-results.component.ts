import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjectsService } from '../projects.service';

import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import {ProjectComponent} from '../project/project.component';

import { MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-project-results',
  templateUrl: './project-results.component.html',
  styleUrls: ['./project-results.component.css']
})
export class ProjectResultsComponent implements OnInit {
  private program;
  private partner;
  // private issue;
  private semester;

  private yearStart;
  private yearEnd;

  private sub;

  private projects: Array<Object>; //all programs
  public dataSource: MatTableDataSource<Object>;
  public displayedColumns = ['name', 'program', 'year', 'semester', 'profile'];
  private projectsService: ProjectsService;
  private backendService: BackendService;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    pProjectsService: ProjectsService,
    pBackendService: BackendService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.projectsService = pProjectsService;
    this.backendService = pBackendService;
   }

  ngOnInit() {
    console.log("Init for program component")
    this.sub = this.route.params.subscribe(params => {
       this.program = params['program'];
       this.partner = params['partner'];
       // this.issue = params['issue'];
       this.semester = params['semester']
       this.yearStart = params['yearStart'];
       this.yearEnd = params['yearEnd'];
       console.log("Submitting Query!")
       this.submitQuery();
    });
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(id) {
    console.log("View profile for partner with ID: " + id);

    // window.location.href = "partner/" + id;
    this.openDialog(id);
  }

  openDialog(id) {
    let dialogRef = this.dialog.open(ProjectComponent, {
      width: '100%',
      height: '100%',
      data: id
    });
    //TODO: can do diffferent things on close of the dialog
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }

  public submitQuery() {
    const program = this.program;
    const partner = this.partner;
    // const issue = this.issue;
    const semester = this.semester;
    const yearStart = this.yearStart;
    const yearEnd = this.yearEnd;
    const resultsPromise = this.makeQuery("GET",
     "project/" +
      program + "/" +
      partner + "/" +
      // issue + "/" +
      semester  + "/" +
      yearStart + "/" + yearEnd
     );
    resultsPromise.then(results =>
      {
        console.log("Received Results!")
        console.log(JSON.stringify(results))
        results.forEach(result => {
          result["profile"] = result["name"]
        })
        this.projects = results;
        this.dataSource = new MatTableDataSource(results)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  //TODO: refactor somewhere
  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null)
  }

}
