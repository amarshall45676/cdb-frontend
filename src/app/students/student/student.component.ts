import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentService } from './student.service';
import { PartnersService } from '../../partners/partners.service';
import { ProgramsService } from '../../programs/programs.service';
import { UtilsService } from '../../utils/utils.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../../app.component.css']
})
export class StudentComponent implements OnInit {
  private student: Object;
  public partners: Array<Object>;
  public programs: Array<Object>;
  public programsApplied: Array<Object>;
  public programsRejected: Array<Object>;
  public programsParticipated: Array<Object>;

  constructor(
    private route: ActivatedRoute,
    public studentService: StudentService,
    private partnersService: PartnersService,
    private programsService: ProgramsService,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) { }

  ngOnInit() {
    var partnersPromise = this.partnersService.getPartnersPromiseForStudent(this.id);
    partnersPromise.then((partners) => {
      console.log(JSON.stringify(partners))
      this.partners = partners;
      this.partners.sort(this.utilsService.comparisonFunction)
    })

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "participated").then(programViews => {
      this.programsParticipated = programViews;
      this.programsParticipated.sort(this.utilsService.comparisonFunction2);
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "applied").then(programViews => {
      this.programsApplied = programViews;
      this.programsApplied.sort(this.utilsService.comparisonFunction2);
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "rejected").then(programViews => {
      this.programsRejected = programViews;
      this.programsRejected.sort(this.utilsService.comparisonFunction2);
    });
  }
}
