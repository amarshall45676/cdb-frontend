import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend/backend.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css', '../../app.component.css']
})
export class StudentFormComponent implements OnInit {
  public creationErrors: boolean;
  public errors: Array<string>;

  public studentForm: FormGroup;
  public studentResult: Object;
  public studentDisplay = false;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.studentForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      email: new FormControl(''),
      phone: new FormControl(''),
      majors: new FormControl(''),
      minors: new FormControl(''),
      gpa: new FormControl(''),
      gradYear: new FormControl('')
    });
  }

  public createStudent() {
    this.creationErrors = false;
    if (this.studentForm.valid) {
      this.backendService.createEntity('student', this.studentForm).then((entityResult: Object) => {
        this.studentDisplay = true;
        this.studentResult = entityResult;
        this.studentForm.reset();
      });
    } else {
      this.clearErrors();
      this.creationErrors = true;
      this.addError('The form you have entered is not valid. Make sure to enter is at least a name for the student.');
    }
  }

  private addError(value: string) {
    this.errors.push(value);
  }

  private clearErrors() {
    this.errors = [];
  }
}
