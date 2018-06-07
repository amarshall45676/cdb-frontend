import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef} from '@angular/material';

import { StudentComponent } from '../../students/student/student.component';
import { PartnerComponent } from '../../partners/partner/partner.component';
import { ProjectComponent } from '../../projects/project/project.component';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent implements OnInit {
  @Input() type: string;
  @Input() entities: Array<Object>;

  //TODO: make this an array of "Entities"
  private displayValues: Array<Object>; //all objects to be displayed
  //TODO: make this a source of "Entities"
  public dataSource: MatTableDataSource<Object>; //allows for filtering and pagination of table
  //TODO: pull display columns from the object
  public displayedColumns = ['name', 'profile'];

  // These are so that the table has sort and paging functionality
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     public dialog: MatDialog) {
   }

  ngOnInit() {
    console.log("Intializing results table")
    this.dataSource = new MatTableDataSource(this.entities);
    // this.displayedColumns = []; //TODO: get these from the object
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(id) {
    console.log("View profile for an entity with ID: " + id);

    this.openDialog(id);
  }

  openDialog(id) {
    var component;
    //TODO: better way to do this than passing a string?
    if (this.type == "student") {
      component = StudentComponent;
    }
    else if (this.type == "partner") {
      component = PartnerComponent;
    }
    else if (this.type == "project") {
      component = ProjectComponent;
    } else {
      console.log("There was an error passing in the type")
    }
    //TODO: need to take the id passed in, then open a component of the correct type for that id
    let dialogRef = this.dialog.open(component, {
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
