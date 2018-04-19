import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../students.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BackendService } from '../../backend/backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
  private partner;
  private program;
  private issue;
  private semester;

  private yearStart;
  private yearEnd;

  private sub;

  private students: Array<Object>; //all students
  private displayStudents: Array<Object>; //students to be displayed
  private dataSource: MatTableDataSource<Object>;
  private displayedColumns = ['name', 'grad_year', 'major_one', 'major_two', 'minor', 'school', 'profile'];

  private studentsService: StudentsService;
  private backendService: BackendService;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(pStudentsService: StudentsService,
     pBackendService: BackendService,
     private route: ActivatedRoute) {
    this.studentsService = pStudentsService;
    this.backendService = pBackendService;
   }

  ngOnInit() {
    console.log("Init for student component")
    this.sub = this.route.params.subscribe(params => {
       this.partner = params['partner'];
       this.program = params['program'];
       this.issue = params['issue'];
       this.semester = params['semester']
       this.yearStart = params['yearStart'];
       this.yearEnd = params['yearEnd'];

       this.submitQuery();
    });
  }

  public submitQuery() {
    const partner = this.partner;
    const program = this.program;
    const issue = this.issue;
    const semester = this.semester;
    const yearStart = this.yearStart;
    const yearEnd = this.yearEnd;

    const resultsPromise = this.makeQuery("GET",
     "student/" +
      partner + "/" +
      program + "/" +
      issue + "/" +
      semester  + "/" +
       yearStart + "/" + yearEnd
     );
    resultsPromise.then(results =>
      {
        results.forEach(result => {
          result["profile"] = result["name"]
        })
        this.students = results;
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


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(id) {
    //TODO: should make the id here something else
    this.studentsService.viewProfile(id);
  }

}
