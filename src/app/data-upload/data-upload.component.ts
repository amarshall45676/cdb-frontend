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
  public programForm: FormGroup;
  public projectForm: FormGroup;
  public studentForm: FormGroup;


  private static objectToForm(object: Object) {
    console.log('Trying to convert: ' + JSON.stringify(object));
    const formData: FormData = new FormData();
    for (const key in object) {
      console.log('Key: ' + key);
      console.log('Value: ' + object[key]);
      formData.append(key, object[key]);
      console.log('Value in: ' + formData.get(key));
      console.log('Form Data result: ' + JSON.stringify(formData));
    }

    return formData;
  }

  // TODO: needed?
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.partnerForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      city: new FormControl(),
      state: new FormControl(),
      zipcode: new FormControl(),
      phone: new FormControl(),
      url: new FormControl()
    });

    this.programForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      purpose: new FormControl(),
      type: new FormControl()
    });

    this.projectForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      programName: new FormControl(),
      yearRun: new FormControl(),
      semester: new FormControl()
    });

    this.studentForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      email: new FormControl(),
      phone: new FormControl(),
      major: new FormControl(),
      minor: new FormControl(),
      gpa: new FormControl(),
      gradYear: new FormControl()
    });
  }

  // TODO: use frontend entities on creation, then maybe can use a form group object to make this reusable

  public createPartner() {
    console.log('Sending: ' + JSON.stringify(DataUploadComponent.objectToForm(this.partnerForm.value)));
    this.backendService.makeEntity(`partner/`,
      DataUploadComponent.objectToForm(this.partnerForm.value))
      .then(r => {
      console.log('Response: ' + JSON.stringify(r));
    });
  }
}
