import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, CanActivate, CanActivateChild, CanDeactivate } from '@angular/router';
// import { AgmCoreModule } from 'angular2-google-maps/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { LbdModule } from './lbd/lbd.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PolicityComponent } from './policity/policity.component';

import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { MediaService } from './services/media.service';
import { SchoolService } from './services/school.service';
import { NewService } from './services/new.service';
import { LoginComponent, LogoutComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UsersAppComponent } from './users-app/users-app.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

import { searchPipe, rowPipe, columnPipe, FilterPipe, UcFirstPipe, SafePipe, MinuteSecondsPipe } from './pipes/pipes';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { AudiosComponent } from './audios/audios.component';
import { VideosComponent } from './videos/videos.component';
import { NewsComponent } from './news/news.component';
import { SchoolsComponent } from './schools/schools.component';
import { NgPipesModule } from 'ngx-pipes';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ProfileComponent } from './profile/profile.component';

import { CustomFormsModule } from 'ng2-validation'
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { ImageUploadModule } from "angular2-image-upload";

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { Ng2CompleterModule } from "ng2-completer";
import { environment } from '../environments/environment.prod';
//import { PaginationModule, TabsModule } from 'ngx-bootstrap';
import { AngularFireModule,} from "@angular/fire";
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';


if(environment.production)
enableProdMode();

const appRoutes: Routes = [
  // { path: 'maps', component: MapsComponent },
  { path: 'policity', component: PolicityComponent, },
  {
    path: '', component: FooterLayoutComponent, children:
    [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'users-app', component: UsersAppComponent, canActivate: [AuthGuard] },
      { path: 'audios', component: AudiosComponent, canActivate: [AuthGuard] },
      { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
      { path: 'schools', component: SchoolsComponent, canActivate: [AuthGuard] },
      { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent,  },
      { path: 'change-pass', component: ChangePassComponent, },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'logout', component: LogoutComponent, },
      { path: 'table', component: TableComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'notifications', component: NotificationsComponent },
      // { path: 'policity', component: PolicityComponent, },
      { path: '**', redirectTo: '/dashboard' }
    ], 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterLayoutComponent,
    DashboardComponent,
    UserComponent,
    UsersAppComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    NotificationsComponent, 
    LoginComponent, 
    LogoutComponent,
    UsersComponent, 
    searchPipe,
    rowPipe,
    columnPipe,
    FilterPipe,
    SafePipe,
    UcFirstPipe,
    ChangePassComponent,
    AudiosComponent,
    VideosComponent,
    NewsComponent,
    SchoolsComponent,
    ProfileComponent, 
    MinuteSecondsPipe, 
    PolicityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Ng2Bs3ModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule,
    //Ng2TableModule,
    //PaginationModule,
    //TabsModule,
    SpinnerComponentModule,
    RouterModule.forRoot(appRoutes),
    //PaginationModule.forRoot(),
    // AgmCoreModule.forRoot({ apiKey: 'AIzaSyAEPDOJl5CPLz6NZcMqJBqZWfVXec3UsJg' }),
    LbdModule, 
    NgPipesModule,
    NguiAutoCompleteModule,
    CustomFormsModule,
    NgxMyDatePickerModule.forRoot(),
    ImageUploadModule.forRoot(),
    Ng2CompleterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule
  ],
  providers: [AuthGuard, AuthService, UserService, MediaService, NewService, DatePipe, SchoolService,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
