import {Component, OnInit, Inject, ViewEncapsulation, ViewChild, AfterViewInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PartnerService } from './partner.service';
import { StudentsService } from '../../students/students.service';
import { ProjectsService } from '../../projects/projects.service';
import { ProgramsService } from '../../programs/programs.service';
import { UtilsService } from '../../utils/utils.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BackendService} from '../../backend/backend.service';
import {ProfileComponent} from '../../reuseable-components/profile/profile.component';
import {Partner} from '../../reuseable-components/profile/entities/partner';


@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PartnerComponent implements OnInit, AfterViewInit {
  public partner: Partner;
  public programs: Array<Object>;

  public contactForm: FormGroup;

  public contactResult= true;
  public contactDisplay = false;


  @ViewChild(ProfileComponent) profile: ProfileComponent<Partner>;

  public contacts = [{name: 'FullName', phone: 'Number', email: 'email', title: 'title', connected_parter: 'connection'}];

  private static objectToForm(object: Object) {
    const formData: FormData = new FormData(); // Printing this out is weird be careful, use .get()
    for (const key in object) {
      formData.append(key, object[key]);
    }

    return formData;
  }

  constructor(public partnerService: PartnerService,
    private backendService: BackendService,
    private programsService: ProgramsService,
    public dialogRef: MatDialogRef<PartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string) {
    this.id = id; // TODO: what if id is updated on profile?
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl(),
      email: new FormControl(),
      title: new FormControl()
    });
  }

  ngAfterViewInit() {
    const id = this.getProfileId();
    this.programsService.getProgramViewsPromiseForPartner(id).then(programViews => {
      this.programs = programViews;
      this.programs.sort(UtilsService.comparisonFunction2);
    });

    // TODO: this should be updated when the partner name is updated
    this.partnerService.getEntityPromise(id).then((partner: Partner) => {
      this.partner = partner;
    });
  }

  private getProfileId() {
    console.log(this.profile.entityId);
    return this.profile.entityId;
  }

  public createContact() {
    // TODO(Augi): augi prob updated this
    if (!this.contactForm.valid) {
      this.contactDisplay = true;
      this.contactResult = false;
    } else {
      this.backendService.resource('PUT', `partner/contact/${this.getProfileId()}`, this.contactForm.value)
        .then((entityResult: Object) => {
          return UtilsService.EntityFromObject(entityResult, 'partner');
      }).then((partner: Partner) => {
        this.partner = partner;
        this.contactForm.reset();
      });
    }
  }
}
