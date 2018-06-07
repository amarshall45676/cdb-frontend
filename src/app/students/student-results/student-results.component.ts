import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../students.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BackendService } from '../../backend/backend.service';
import { ActivatedRoute } from '@angular/router';

//Import students component for dialog
import { StudentComponent } from '../student/student.component';

import { MatDialog, MatDialogRef} from '@angular/material';

//TODO: add overal style sheet for below and side by side div

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
  public dataSource: MatTableDataSource<Object>;
  public displayedColumns = ['name', 'grad_year', 'major_one', 'major_two', 'minor', 'school', 'profile'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     private studentsService: StudentsService,
     private backendService: BackendService,
     public dialog: MatDialog,
     private route: ActivatedRoute) {
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

  // public viewProfile(id) {
  //   //TODO: should make the id here something else
  //   this.studentsService.viewProfile(id);
  // }

  public viewProfile(id) {
    console.log("View profile for student with ID: " + id);

    this.openDialog(id);
  }

  openDialog(id) {
    let dialogRef = this.dialog.open(StudentComponent, {
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

}
