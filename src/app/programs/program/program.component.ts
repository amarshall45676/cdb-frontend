import {Component, OnDestroy, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProgramService } from './program.service';

import { StudentsService } from '../../students/students.service';

import { PartnersService } from '../../partners/partners.service';
import {Program} from '../../reuseable-components/profile/entities/program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css', '../../app.component.css']
})
export class ProgramComponent implements OnInit, OnDestroy {
  public id;
  private sub;

  public program: Program;
  public hasFAQ = false;
  public fellowship = false;

  constructor(
    private route: ActivatedRoute,
    public programService: ProgramService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];

       this.programService.getProgramPromise(this.id).then((program: Program) => {
         this.program = program;
         // If there are FAQ's this will not be null, also dont include FAQ's for fellowships
         this.hasFAQ = program._numStudents !== undefined;
         this.fellowship =  program._type === 'Fellowship';
       });
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
