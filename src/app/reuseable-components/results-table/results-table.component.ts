import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
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

  // These are so that the table has sort and paging functionality
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     public dialog: MatDialog,
     private backendService: BackendService) {}

  ngOnInit() {
    console.log('Query String: ' + this.queryString);
    this.makeQuery(this.queryString).then(entities => {
        // TODO: pull display columns from the object
        this.entities = entities;
        console.log('----Initializing results table----');
        if (this.entities.length > 0) { // If there are entities
          const entity: Entity = this.entities[0];
          const keys = entity.getTableProperties();
          console.log('Keys: ' + JSON.stringify(keys));
          // Make sure profile is just button
          this.displayProperties = keys.slice();
          console.log('Properties: ' + JSON.stringify(this.displayProperties));
          this.displayColumns = keys.slice().concat('Profile');
          console.log('Columns: ' + JSON.stringify(this.displayColumns));
        }
        this.dataSource = new MatTableDataSource(this.entities.map((entity: Entity) => {
          return entity; // ._display
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (entity: Entity, sortHeaderId: string) => {
          return entity.getValue(sortHeaderId);
        };
        this.dataSource.sort = this.sort;
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

  public viewProfile(id) {
    console.log('View profile for an entity with ID: ' + JSON.stringify(id));
    this.openDialog(id);
  }

  openDialog(id) {
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

    const dialogRef = this.dialog.open(component, { // TODO: Should this be MatDialofRef?
      width: '100%',
      height: '100%',
      data: id
    });

    // TODO: can do diffferent things on close of the dialog, also if observable then should I destory it?
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }

}
