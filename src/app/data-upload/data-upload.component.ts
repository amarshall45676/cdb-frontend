import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend/backend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css', '../app.component.css']
})
export class DataUploadComponent implements OnInit {
  public partnerForm: FormGroup;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.partnerForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      city: new FormControl(),
      state: new FormControl(),
      zipcode: new FormControl()
    });
  }

  // TODO: use frontend entities on creation, then maybe can use a form group object to make this reusable

  public createPartner() {
    console.log(this.partnerForm.controls)
    console.log('Partner Name: ' + JSON.stringify(this.partnerForm.get('name').value));
    console.log('Partner Name: ' + JSON.stringify(this.partnerForm.get('city').value));
  }

}
