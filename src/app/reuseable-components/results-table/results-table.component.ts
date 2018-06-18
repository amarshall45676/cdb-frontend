import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef} from '@angular/material';

import { BackendService } from '../../backend/backend.service';

import { StudentComponent } from '../../students/student/student.component';
import { PartnerComponent } from '../../partners/partner/partner.component';
import { ProjectComponent } from '../../projects/project/project.component';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css', '../../app.component.css']
})
export class ResultsTableComponent implements OnInit {
  @Input() type: string;
  @Input() queryString: string; //String to send query to backend

  entities: Array<Object>;

  //TODO: make this an array of "Entities"
  private displayValues: Array<Object>; //all objects to be displayed
  //TODO: make this a source of "Entities"
  public dataSource: MatTableDataSource<Object>; //allows for filtering and pagination of table
  //TODO: pull display columns from the object
  public displayProperties: Array<string>; // these are the properties for the table
  public displayedColumns: Array<string> // these are the addition columns for the table

  // These are so that the table has sort and paging functionality
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     public dialog: MatDialog,
     private backendService: BackendService)
   { }

  ngOnInit() {
    console.log("Query String: " + this.queryString)
    const resultsPromise = this.makeQuery(this.queryString);
    resultsPromise.then(results =>
      {
        this.entities = results; //TODO: refactor here
        console.log("Intializing results table")
        if (this.entities) {
          const entity = this.entities[0]
          const keys = Object.keys(entity);
          this.removeElementFromArray(keys, "Notes")
          this.displayedColumns = keys.slice();
          //Make sure profile is just button
          //TODO: clean this up it is ugly
          keys.push("profile")
          this.entities.forEach(result => {
            result["profile"] = result["Name"]
          })
          this.displayProperties = keys.slice();
        }
        this.dataSource = new MatTableDataSource(this.entities);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  private removeElementFromArray(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }

  //TODO: refactor below to a service?
  private makeQuery(endpoint) {
    return this.backendService.resource("GET", endpoint, null)
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(id) {
    console.log("View profile for an entity with ID: " + JSON.stringify(id));

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
