import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend/backend.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css', '../../app.component.css']
})
export class ProjectFormComponent implements OnInit {
  public creationErrors: boolean;
  public errors: Array<string>;

  public projectForm: FormGroup;
  public projectResult: Object;
  public projectDisplay = false;


  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.projectForm = new FormGroup ({
      name: new FormControl('', Validators.required),
      programName: new FormControl(''),
      year: new FormControl(''),
      semester: new FormControl('')
    });
  }


  public createProject() {
    this.creationErrors = false;
    if (this.projectForm.valid) {
      this.backendService.createEntity('project', this.projectForm).then((entityResult: Object) => {
        this.projectDisplay = true;
        this.projectResult = entityResult;
        this.projectForm.reset();
      });
    } else {
      this.clearErrors();
      this.creationErrors = true;
      this.addError('The form you have entered is not valid. Make sure to enter is at least a name for the project.');
    }
  }

  private addError(value: string) {
    this.errors.push(value);
  }

  private clearErrors() {
    this.errors = [];
  }
}
