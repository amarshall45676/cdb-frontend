import { Component, OnInit, ViewChild} from '@angular/core';

import { AffiliatesService } from '../affiliates.service';

import { ActivatedRoute } from '@angular/router';

import { ProgramsService } from '../../programs/programs.service';

import { BackendService } from '../../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-affiliate-results',
  templateUrl: './affiliate-results.component.html',
  styleUrls: ['./affiliate-results.component.css']
})
export class AffiliateResultsComponent implements OnInit {
  private department;
  private issue;
  private type;
  private semester;

  private yearStart;
  private yearEnd;

  private sub;

  private partners: Array<Object>; //all partners

  public dataSource: MatTableDataSource<Object>;
  public displayedColumns = ['name', 'profile'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private affiliatesService: AffiliatesService,
     private backendService: BackendService,
     private route: ActivatedRoute) {
   }

  ngOnInit() {
    //TODO: change this
    this.sub = this.route.params.subscribe(params => {
       this.department = params['department'];
       this.issue = params['issue'];
       this.type = params['type'];
       this.semester = params['semester']
       this.yearStart = params['yearStart'];
       this.yearEnd = params['yearEnd'];

       this.submitQuery();
    });
  }

  public viewProfile(id) {
    this.affiliatesService.viewProfile(id)
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public submitQuery() {
    const department = this.department;
    const issue = this.issue;
    const type = this.type;
    const semester = this.semester;
    const yearStart = this.yearStart;
    const yearEnd = this.yearEnd;

    const resultsPromise = this.makeQuery("GET",
     "affiliate/" +
      department + "/" +
      issue + "/" +
      type + "/" +
      semester  + "/" +
       yearStart + "/" + yearEnd
     );
    resultsPromise.then(results =>
      {
        console.log(JSON.stringify(results))
        results.forEach(result => {
          result["profile"] = result["name"]
        })
        this.partners = results;
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
