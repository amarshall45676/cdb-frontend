import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend/backend.service';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css', '../../app.component.css']
})
export class ProgramFormComponent implements OnInit {
  public creationErrors: boolean;
  public errors: Array<string>;

  public programForm: FormGroup;
  public programResult: Object;
  public programDisplay = false;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.programForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      purpose: new FormControl(''),
      type: new FormControl('')
    });
  }

  public createProgram() {
    this.creationErrors = false;
    if (this.programForm.valid) {
      this.backendService.createEntity('program', this.programForm).then((entityResult: Object) => {
        this.programDisplay = true;
        this.programResult = entityResult;
        this.programForm.reset();
      });
    } else {
      this.clearErrors();
      this.creationErrors = true;
      this.addError('The form you have entered is not valid. Make sure to enter is at least a name for the program.');
    }
  }

  private addError(value: string) {
    this.errors.push(value);
  }

  private clearErrors() {
    this.errors = [];
  }
}
