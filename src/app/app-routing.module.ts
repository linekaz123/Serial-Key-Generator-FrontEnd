import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerialSetComponent } from './components/serial-set/serial-set.component';

const routes: Routes = [
  { path: '', component: SerialSetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
