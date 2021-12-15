import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { DfdImportComponent } from './dfd-import/dfd-import.component';
import { MappingComponent } from './mapping/mapping.component';
import { ElicitComponent } from './elicit/elicit.component';
import { MisuseComponent } from './misuse/misuse.component';
import { PrintComponent } from './print/print.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dfd-import', component: DfdImportComponent },
  { path: 'mapping', component: MappingComponent },
  { path: 'elicit', component: ElicitComponent },
  { path: 'misuse', component: MisuseComponent },
  { path: 'print', component: PrintComponent }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}