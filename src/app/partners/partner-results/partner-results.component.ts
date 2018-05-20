import { Component, OnInit, ViewChild} from '@angular/core';

import { PartnersService } from '../partners.service';

import { ActivatedRoute } from '@angular/router';

import { ProgramsService } from '../../programs/programs.service';

import { BackendService } from '../../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-partner-results',
  templateUrl: './partner-results.component.html',
  styleUrls: ['./partner-results.component.css']
})
export class PartnerResultsComponent implements OnInit {
  private program;
  private issue;
  private type;
  private semester;

  private yearStart;
  private yearEnd;

  private sub;

  private partners: Array<Object>; //all partners

  private dataSource: MatTableDataSource<Object>;
  private displayedColumns = ['name', 'city', 'state', 'zipcode', 'profile'];
  private partnersService: PartnersService;

  private backendService: BackendService;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(pPartnersService: PartnersService,
     pBackendService: BackendService,
     private route: ActivatedRoute) {
    this.partnersService = pPartnersService;
    this.backendService = pBackendService;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.program = params['program'];
       this.issue = params['issue'];
       this.type = params['type'];
       this.semester = params['semester']
       this.yearStart = params['yearStart'];
       this.yearEnd = params['yearEnd'];

       this.submitQuery();
    });
  }

  public viewProfile(id) {
    this.partnersService.viewProfile(id)
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public submitQuery() {
    const program = this.program;
    const issue = this.issue;
    const type = this.type;
    const semester = this.semester;
    const yearStart = this.yearStart;
    const yearEnd = this.yearEnd;

    //TODO: refactor this to service

    const resultsPromise = this.makeQuery("GET",
     "partner/" +
      program + "/" +
      issue + "/" +
      type + "/" +
      semester  + "/" +
       yearStart + "/" + yearEnd
     );
    resultsPromise.then(results =>
      {
        // console.log(JSON.stringify(results))
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
