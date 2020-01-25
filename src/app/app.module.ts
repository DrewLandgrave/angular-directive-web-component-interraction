import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material';

import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdvtechTextInputModule} from './components/advtech-text-input/advtech-text-input.module';
import {AdvtechTextareaInputModule} from './components/advtech-textarea-input/advtech-textarea-input.module';
import {ExamplePageComponent} from './components/example-page/example-page.component';
import {PanelModule} from './components/panel/panel.module';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {MainColumnDirective} from './directives/main-column/main-column.directive';
import {SyncFieldDirective} from './directives/sync-field/sync-field.directive';
import {SyncWcFieldDirective} from './directives/sync-wc-field/sync-wc-field.directive';
import {WebComponentFormControlDirective} from './directives/web-component-form-control/web-component-form-control.directive';


const appRoutes: Routes = [
  {path: '', component: ExamplePageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ExamplePageComponent,
    WrapperComponent,
    MainColumnDirective,
    SyncFieldDirective,
    SyncWcFieldDirective,
    WebComponentFormControlDirective,
  ],
  entryComponents: [WrapperComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    PanelModule,
    AdvtechTextInputModule,
    AdvtechTextareaInputModule,
        MatExpansionModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
