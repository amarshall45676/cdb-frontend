// Imports from angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Outside Libraries
import {CookieModule} from 'ngx-cookie';

// Angular Material Imports
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
  MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';

// Import base app
import { AppComponent } from './app.component';

// Guards for the URLS
import { AuthGuard } from './authGuard/auth.guard';
import { AuthService } from './authGuard/auth.service';

// Students Imports
import { StudentsComponent } from './students/students.component';
import { StudentsService } from './students/students.service';

import { StudentComponent } from './students/student/student.component';
import { StudentService } from './students/student/student.service';

import { StudentResultsComponent } from './students/student-results/student-results.component';

// Programs Imports
import { ProgramsService } from './programs/programs.service';
import { ProgramComponent } from './programs/program/program.component';
import { ProgramService } from './programs/program/program.service';

// Partner Imports
import { PartnersComponent } from './partners/partners.component';
import { PartnersService } from './partners/partners.service';

import { PartnerService } from './partners/partner/partner.service';
import { PartnerComponent } from './partners/partner/partner.component';

import { PartnerResultsComponent } from './partners/partner-results/partner-results.component';

// Projects Imports
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsService } from './projects/projects.service';

import { ProjectComponent } from './projects/project/project.component';
import { ProjectService } from './projects/project/project.service';

import { ProjectResultsComponent } from './projects/project-results/project-results.component';

// Affiliates Imports
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { AffiliatesService } from './affiliates/affiliates.service';

import { AffiliateResultsComponent } from './affiliates/affiliate-results/affiliate-results.component';
import { AffiliateComponent } from './affiliates/affiliate/affiliate.component';

import { DataUploadComponent } from './data-upload/data-upload.component';

// Landing and Main page imports
import { LandingComponent } from './landing/landing.component';
import { NoAuthComponent } from './no-auth/no-auth.component';
import { MainComponent } from './main/main.component';

// Import Backend Service
import { BackendService } from './backend/backend.service';
import { URLService } from './url/url.service';
import { UtilsService } from './utils/utils.service';

// Reusable components and services
import { PageHeaderComponent } from './reuseable-components/page-header/page-header.component';
import { QueryNavigationComponent } from './reuseable-components/query-navigation/query-navigation.component';
import { ResultsTableComponent } from './reuseable-components/results-table/results-table.component';
import { FileUploadComponent } from './reuseable-components/file-upload/file-upload.component';

import { ProfileComponent } from './reuseable-components/profile/profile.component';
import { ProfileService } from './reuseable-components/profile/profile.service';



// Defining the routes for the project
export const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'test', component: ResultsTableComponent},
  {path: 'noAuth', component: NoAuthComponent},
  {path: 'landing', component: LandingComponent},
  {
    path: 'dataUpload',
    component : DataUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students',
    component : StudentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'studentResults',
    component : StudentResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'studentResults/:partner/:program/:issue/:semester/:yearStart/:yearEnd',
    component : StudentResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student/:id',
    component : StudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'partners',
    component : PartnersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'partnerResults', // Empty route for just viewing all partners in the DB
    component : PartnerResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'partnerResults/:program/:issue/:type/:semester/:yearStart/:yearEnd',
    component : PartnerResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'partner/:id',
    component : PartnerComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'program/:id',
  component : ProgramComponent,
  canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component : ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projectResults', // Empty route for just viewing all partners in the DB
    component : ProjectResultsComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'projectResults/:program?/:partner?/semester?/yearStart?/yearEnd?', // Empty route for just viewing all partners in the DB
  //   component : ProjectResultsComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'project/:id',
    component : ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'affiliates',
    component : AffiliatesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'affiliateResults/:department/:issue/:type/:semester/:yearStart/:yearEnd',
    component : AffiliateResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'affiliate/:id',
    component : AffiliateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component : MainComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    PartnersComponent,
    MainComponent,
    StudentComponent,
    ProgramComponent,
    PartnerComponent,
    PartnerResultsComponent,
    StudentResultsComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectResultsComponent,
    LandingComponent,
    AffiliatesComponent,
    AffiliateResultsComponent,
    AffiliateComponent,
    NoAuthComponent,
    DataUploadComponent,
    PageHeaderComponent,
    QueryNavigationComponent,
    ProfileComponent,
    ResultsTableComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    // Angular Material Modules
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    BackendService,
    StudentsService, StudentService,
    ProgramsService, ProgramService,
    PartnersService, PartnerService,
    ProjectsService, ProjectService,
    AffiliatesService,
    AuthService, AuthGuard,
    URLService, UtilsService
  ],
  bootstrap: [AppComponent],
  schemas : [] // CUSTOM_ELEMENTS_SCHEMA
})

export class AppModule { }
