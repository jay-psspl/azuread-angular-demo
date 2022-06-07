import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { ReportComponent } from './report/report.component';


const isIE = window.navigator.userAgent.indexOf('MSIE') > -1
||window.navigator.userAgent.indexOf('Trident/') > -1;


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth : {

            clientId: '7db97f4f-965a-47b6-9ff6-bd1dbd633707', //7db97f4f-965a-47b6-9ff6-bd1dbd633707
            redirectUri: 'http://localhost:4200',
            authority: 'https://login.microsoftonline.com/9f1a0fe2-b168-4228-b34b-85dc646fa753' //9f1a0fe2-b168-4228-b34b-85dc646fa753
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.read']],
            ['localhost', ['api://5ac87f17-2454-4a39-93e8-80b4b13dd77a/api.scope']]
          ]
        )
      }
      ),
    BrowserAnimationsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },MsalGuard, AzureAdDemoService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
