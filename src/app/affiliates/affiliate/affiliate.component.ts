import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AffiliatesService } from '../affiliates.service';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css', '../../app.component.css']
})
export class AffiliateComponent implements OnInit {
  private sub;
  private id;

  private affiliate;

  constructor(
        private route: ActivatedRoute,
        private affiliatesService: AffiliatesService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];

       //Get the specific program info from the database
       var affiliatePromise = this.affiliatesService.getAffiliatePromise(this.id);
       affiliatePromise.then((affiliate) => {
         console.log("Affiliate is: " + JSON.stringify(affiliate))
         this.affiliate = affiliate;
       });
    });
  }

}
