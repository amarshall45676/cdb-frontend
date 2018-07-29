import {Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatDialogRef} from '@angular/material';
import { MatDialog} from '@angular/material';

import { BackendService } from '../../backend/backend.service';
import { UtilsService } from '../../utils/utils.service';

import { StudentComponent } from '../../students/student/student.component';
import { PartnerComponent } from '../../partners/partner/partner.component';
import { ProjectComponent } from '../../projects/project/project.component';
import {Entity} from '../profile/entities/entity';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css', '../../app.component.css']
})
export class ResultsTableComponent implements OnInit {
  /// Inputs specifying the type of entity that will be displayed and the query string for it
  @Input() type: string;
  @Input() queryString: string; // String to send query to backend

  public entities: Array<Entity>; // Entities to be displayed
  public dataSource: MatTableDataSource<Entity>; // allows for filtering and pagination of table
  public displayProperties: Array<string>; // these are the properties for the table
  public displayColumns: Array<string>; // these include addition columns for the table(e.g. profile)

  public loadingResults: boolean;

  // These are so that the table has sort and paging functionality
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     public dialog: MatDialog,
     private backendService: BackendService) {}

  ngOnInit() {
    // On load make sure frontend ays it is loading while query runs
    this.loadingResults = true;
    this.makeQuery(this.queryString).then(entities => {
      this.loadingResults = false;
      this.entities = entities;
      if (this.entities.length > 0) { // If there are entities
        const entity: Entity = this.entities[0];
        const keys = entity.getTableProperties();
        // Make sure profile is just button
        this.displayProperties = keys.slice();
        this.displayColumns = keys.slice().concat('Profile');
      }
      this.setDataSource(this.entities);
    });
  }

  // Make query to the backend
  private makeQuery(endpoint): Promise<Array<Entity>> {
    return this.backendService.resource('GET', endpoint, null).then(objects => {
        return objects.map(object => {
          return UtilsService.EntityFromObject(object, this.type);
        });
      }
    );
  }

  // Aply filter to the data in the table
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(entity: Entity) {
    this.openDialog(entity);
  }

  // Open dialog for the given entity
  openDialog(entity: Entity) {
    let component;
    if (this.type === 'student') {
      component = StudentComponent;
    } else if (this.type === 'partner') {
      component = PartnerComponent;
    } else if (this.type === 'project') {
      component = ProjectComponent;
    } else {
      console.log('There was an error passing in the type');
    }

    const dialogRef = this.dialog.open(component, {
      width: '100%',
      height: '100%',
      disableClose: true,
      data: entity._profile
    });

    // Once the dialog is close, updat ethe display so the table shows any fields that were updated
    dialogRef.afterClosed().subscribe(result => {
      entity.updateDisplay(result);
    });
  }

  private setDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (entity: Entity, sortHeaderId: string) => {
      return entity.getValue(sortHeaderId);
    };
  }

}
