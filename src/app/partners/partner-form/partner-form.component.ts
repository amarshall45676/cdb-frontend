import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend/backend.service';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css', '../../app.component.css']
})
export class PartnerFormComponent implements OnInit {
  public creationErrors: boolean;
  public errors: Array<string>;

  public partnerForm: FormGroup;
  public partnerResult: Object;
  public partnerDisplay = false;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.partnerForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipcode: new FormControl(''),
      phone: new FormControl(''),
      url: new FormControl('')
    });
  }

  public createPartner() {
    this.creationErrors = false;
    if (this.partnerForm.valid) {
      this.backendService.createEntity('partner', this.partnerForm).then((entityResult: Object) => {
        this.partnerDisplay = true;
        this.partnerResult = entityResult;
        this.partnerForm.reset();
      });
    } else {
      this.clearErrors();
      this.creationErrors = true;
      this.addError('The form you have entered is not valid. Make sure to enter is at least a name for the partner.');
    }
  }

  private addError(value: string) {
    this.errors.push(value);
  }

  private clearErrors() {
    this.errors = [];
  }
}
