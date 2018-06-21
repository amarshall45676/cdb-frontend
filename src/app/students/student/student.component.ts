import { Component, OnInit, Inject} from '@angular/core';

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
  public partners: Array<Object>;
  public programs: Array<Object>;
  public programsApplied: Array<Object>;
  public programsRejected: Array<Object>;
  public programsParticipated: Array<Object>;

  constructor(
    public studentService: StudentService,
    private partnersService: PartnersService,
    private programsService: ProgramsService,
    @Inject(MAT_DIALOG_DATA) public id: string) {}

  ngOnInit() {
    this.partnersService.getPartnersPromiseForStudent(this.id).then((partners) => {
      this.partners = partners;
      this.partners.sort(UtilsService.comparisonFunction);
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, 'participated').then(programViews => {
      this.programsParticipated = programViews;
      this.programsParticipated.sort(UtilsService.comparisonFunction2);
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, 'applied').then(programViews => {
      this.programsApplied = programViews;
      this.programsApplied.sort(UtilsService.comparisonFunction2);
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, 'rejected').then(programViews => {
      this.programsRejected = programViews;
      this.programsRejected.sort(UtilsService.comparisonFunction2);
    });
  }
}
