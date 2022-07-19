import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'
import { MainViewComponent } from './main-view/main-view.component'
import { PokingRoomComponent } from "./poking-room/poking-room.component"

const routes: Routes = [
  { path: 'login', component: MainViewComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'poking-room', component: PokingRoomComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
