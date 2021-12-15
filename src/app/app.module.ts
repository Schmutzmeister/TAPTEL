import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DfdImportComponent } from './dfd-import/dfd-import.component';
import { MappingComponent } from './mapping/mapping.component';
import { ElicitComponent } from './elicit/elicit.component';
import { MisuseComponent } from './misuse/misuse.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TreeviewComponent } from './treeview/treeview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrintComponent } from './print/print.component';

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DfdImportComponent,
    MappingComponent,
    ElicitComponent,
    MisuseComponent,
    TreeviewComponent,
    PrintComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }