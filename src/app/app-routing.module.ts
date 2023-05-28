import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeatstarSiteModStatusPageViewModule } from './beatstar-site-mod-status-page-view/beatstar-site-mod-status-page-view.module';
import { ModStatusSiteMainComponent } from './beatstar-site-mod-status-page-view/mod-status-site-main/mod-status-site-main.component';

const routes: Routes = [
  {path:'',component:ModStatusSiteMainComponent},
  {path:'status',component:ModStatusSiteMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BeatstarSiteModStatusPageViewModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
