import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import { AppComponent } from './app.component';

import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './students/student/student.component';
import { StudentsService } from './students/students.service';
import { StudentService } from './students/student/student.service';
import { StudentResultsComponent } from './students/student-results/student-results.component';

import { ProgramsComponent } from './programs/programs.component';
import { ProgramComponent } from './programs/program/program.component';
import { ProgramResultsComponent } from './programs/program-results/program-results.component';
import { ProgramsService } from './programs/programs.service';
import { ProgramService } from './programs/program/program.service';

import { PartnersComponent } from './partners/partners.component';
import { PartnersService } from './partners/partners.service';
import { PartnerService } from './partners/partner/partner.service';
import { PartnerComponent } from './partners/partner/partner.component';
import { PartnerResultsComponent } from './partners/partner-results/partner-results.component';

import { MainComponent } from './main/main.component';

import { BackendService } from './backend/backend.service';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectResultsComponent } from './projects/project-results/project-results.component';
import { ProjectsService } from './projects/projects.service';
import { ProjectService } from './projects/project/project.service';


import { LandingComponent } from './landing/landing.component';

import { AffiliatesComponent } from './affiliates/affiliates.component';
import { AffiliateResultsComponent } from './affiliates/affiliate-results/affiliate-results.component';
import { AffiliateComponent } from './affiliates/affiliate/affiliate.component';
import { AffiliatesService } from './affiliates/affiliates.service';
import { NoAuthComponent } from './no-auth/no-auth.component';

export const routes : Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'noAuth', component: NoAuthComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'students', component : StudentsComponent},
  {path: 'studentResults/:partner/:program/:issue/:semester/:yearStart/:yearEnd', component : StudentResultsComponent},
  {path: 'student/:id', component : StudentComponent},
  {path: 'partners', component : PartnersComponent},
  {path: 'partnerResults/:program/:issue/:type/:semester/:yearStart/:yearEnd', component : PartnerResultsComponent},
  {path: 'partner/:id', component : PartnerComponent},
  {path: 'programs', component : ProgramResultsComponent},
  // {path: 'programResults/:program/:semester/:yearStart/:yearEnd', component : },
  {path: 'program/:id', component : ProgramComponent},
  {path: 'projects', component : ProjectsComponent},
  {path: 'projectResults/:program/:partner/:semester/:yearStart/:yearEnd', component : ProjectResultsComponent},
  {path: 'project/:id', component : ProjectComponent},
  {path: 'affiliates', component : AffiliatesComponent},
  {path: 'affiliateResults/:department/:issue/:type/:semester/:yearStart/:yearEnd', component : AffiliateResultsComponent},
  {path: 'affiliate/:id', component : AffiliateComponent},
  {path: 'main', component : MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ProgramsComponent,
    PartnersComponent,
    MainComponent,
    StudentComponent,
    ProgramComponent,
    PartnerComponent,
    PartnerResultsComponent,
    ProgramResultsComponent,
    StudentResultsComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectResultsComponent,
    LandingComponent,
    AffiliatesComponent,
    AffiliateResultsComponent,
    AffiliateComponent,
    NoAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {}), //useHash : true
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [
    BackendService,
    StudentsService, StudentService,
    ProgramsService, ProgramService,
    PartnersService, PartnerService,
    ProjectsService, ProjectService,
    AffiliatesService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
