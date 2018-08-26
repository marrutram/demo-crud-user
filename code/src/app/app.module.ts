import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatTableModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { CrudUsersComponent } from './crudUsers/crudUsers.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiUsersService, AuthenticationService, AlertService }  from './services';
import { TokenInterceptor, ErrorInterceptor, AuthGuard} from './helpers';
import { routing } from './app.routing';
import { LoginComponent } from './login';
import { AlertComponent } from './directives';
import { AppComponent }  from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    CrudUsersComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    ApiUsersService,
    AuthenticationService,
    AlertService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
