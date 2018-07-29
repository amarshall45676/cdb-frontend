import { Component, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner-results',
  templateUrl: './partner-results.component.html',
  styleUrls: ['./partner-results.component.css']
})
export class PartnerResultsComponent implements OnInit {
  private sub;
  public queryString;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       const program = params['program'];
       const type = params['type'];
       const semester = params['semester'];
       const yearStart = params['yearStart'];
       const yearEnd = params['yearEnd'];

       if (!program) { // Means just all partners are wanted
         this.queryString = `partner/`;
       } else { // Otherwise submit a query with parameters
         this.queryString = `partner/${program}/${type}/${semester}/${yearStart}/${yearEnd}`;
       }
    });
  }
}
