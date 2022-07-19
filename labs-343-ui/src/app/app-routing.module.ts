import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainViewComponent } from './main-view/main-view.component'

const routes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: '', redirectTo: '/main-view', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
