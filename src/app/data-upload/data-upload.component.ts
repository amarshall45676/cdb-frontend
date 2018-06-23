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

  public partnerResult: Object;
  public partnerDisplay = false;

  public programResult: Object;
  public programDisplay = false;

  public projectResult: Object;
  public projectDisplay = false;

  public studentResult: Object;
  public studentDisplay = false;

  private static objectToForm(object: Object) {
    const formData: FormData = new FormData(); // Printing this out is weird be careful, use .get()
    for (const key in object) {
      formData.append(key, object[key]);
    }

    return formData;
  }

  // TODO: needed?
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.partnerForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      address: new FormControl(),
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
      year: new FormControl(),
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

  public createPartner() {
    // TODO: make a selector that pops up a dialog, fill out the right form, on submit if the form looks good close it,
    // otherwise inform user
    this.createEntity('partner', this.partnerForm).then((entityResult: Object) => {
      console.log('Result: ' + JSON.stringify(entityResult));
      this.partnerDisplay = true;
      this.partnerResult = entityResult;
    });
  }

  public createProject() {
    this.createEntity('project', this.projectForm).then((entityResult: Object) => {
      this.projectDisplay = true;
      this.projectResult = entityResult;
    });
  }

  public createProgram() {
    this.createEntity('program', this.programForm).then((entityResult: Object) => {
      this.programDisplay = true;
      this.programResult = entityResult;
    });
  }

  public createStudent() {
    this.createEntity('student', this.studentForm).then((entityResult: Object) => {
      this.studentDisplay = true;
      this.studentResult = entityResult;
    });
  }


  public createEntity(type: string, form: FormGroup) {
    if (!form.valid) {
      console.log('Form is not valid'); // TODO: have this display
    } else {
      return this.backendService.makeEntity(`${type}/`, DataUploadComponent.objectToForm(form.value));
    }
  }
}
