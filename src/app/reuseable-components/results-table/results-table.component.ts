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
  @Input() type: string;
  @Input() queryString: string; // String to send query to backend

  public entities: Array<Entity>;
  // TODO: change??
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

  // TODO: refactor below to a service?
  private makeQuery(endpoint): Promise<Array<Entity>> {
    return this.backendService.resource('GET', endpoint, null).then(objects => {
        return objects.map(object => {
          return UtilsService.EntityFromObject(object, this.type);
        });
      }
    );
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public viewProfile(entity: Entity) {
    console.log('View profile for an entity with ID: ' + JSON.stringify(entity._profile));
    this.openDialog(entity);
  }

  openDialog(entity: Entity) {
    let component;
    // TODO: better way to do this than passing a string?
    if (this.type === 'student') {
      component = StudentComponent;
    }
    if (this.type === 'partner') {
      component = PartnerComponent;
    }
    if (this.type === 'project') {
      component = ProjectComponent;
    } else {
      console.log('There was an error passing in the type');
    }

    // TODO: might want to change it so it cannot be closed without hitting close button
    const dialogRef = this.dialog.open(component, {
      width: '100%',
      height: '100%',
      disableClose: true,
      data: entity._profile
    });

    // TODO: also if observable then should I destroy it?
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
