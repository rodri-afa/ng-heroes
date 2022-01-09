import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';

import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroComponent } from './components/hero/hero.component';
import { IonicModule } from '@ionic/angular';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public controlClick(){
    console.log('control click body')
  }
}
