import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend/backend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css', '../app.component.css']
})
export class DataUploadComponent implements OnInit {

  ngOnInit() {}

}
