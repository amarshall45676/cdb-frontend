import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
  private sub;
  public queryString;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log("Init for student component")
    this.sub = this.route.params.subscribe(params =>
      {
       const partner = params['partner'];
       const program = params['program'];
       const issue = params['issue'];
       const semester = params['semester']
       const yearStart = params['yearStart'];
       const yearEnd = params['yearEnd'];

       if (!partner) {
         this.queryString = "student/"
       } else {
         this.queryString =
          "student/" +
            partner + "/" +
            program + "/" +
            issue + "/" +
            semester  + "/" +
            yearStart + "/" + yearEnd
        }
      });
  }

}
