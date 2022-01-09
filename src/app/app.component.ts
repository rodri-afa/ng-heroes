import { Component, ViewChild } from '@angular/core';
import { HammerLoader } from '@angular/platform-browser';
import { HeroComponent } from './components/hero/hero.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'Heroes App';
  
  @ViewChild(HeroComponent) heroComponent!: HeroComponent;

  controlClick(event:any){
    if (this.heroComponent.selectedHero ){
      this.heroComponent.deselectHero(event);
    }
  }
}
