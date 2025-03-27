import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileandeditComponent} from './Amal/profileandedit/profileandedit.component';
import { HistoryComponent } from './Amal/history/history.component';

const routes: Routes = [{ path: "profile", component: ProfileandeditComponent }, { path: "history", component: HistoryComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
