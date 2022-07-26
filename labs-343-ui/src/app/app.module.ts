import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MockNgConfigModule } from '@northfork/mock-ng-config'
import { ButtonModule, NfFormsModule, PermissionModule, ToastModule } from '@northfork/ng-basics'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomePageComponent } from './home-page/home-page.component'
import { MainViewComponent } from './main-view/main-view.component'
import { ParticipantComponent } from "./poking-room/participant/participant.component"
import { PokingRoomComponent } from "./poking-room/poking-room.component"

@NgModule({
  declarations: [AppComponent, MainViewComponent, HomePageComponent, PokingRoomComponent, ParticipantComponent],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // External Modules
    NgbModule,

    // Northfork Modules
    MockNgConfigModule, // This module should be switched out for the environment configuration you want to use.
    PermissionModule,
    ToastModule,

    // Application Modules
    AppRoutingModule,
    ReactiveFormsModule,
    NfFormsModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
