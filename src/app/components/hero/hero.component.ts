import { Component, ElementRef, HostListener, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { Power } from 'src/app/models/power';
import { HeroesServiceService } from 'src/app/services/heroes-service.service';
import { PowersService } from 'src/app/services/powers.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @ViewChild('activeHero') activeHero:any;
  // @ViewChildren('activeHero', {read: ElementRef}) activeHero!: QueryList<ElementRef>;


  heroes$!: Observable<Hero[]>;
  selectedHero: any ={} as Hero;
  newHeroData: Hero ={} as Hero;
  // heroUpdated:any={name:"Otherman",height:1.85, weight:85};
  isModalOpen:Boolean = false;
  newPower: string = '';
  
  
  constructor(private heroService: HeroesServiceService, private powerService:PowersService){}

  ngOnInit():void{
    this.getHeroes();
    this.selectedHero ={} as Hero;

  }
  toArray(object: any) {
    return Object.keys(object).map(key => object[key])
  }

  //HEROES
  getHeroes():any{
    this.heroes$ = this.heroService.getHeroes();
  }

  newHeroModal(){
    this.isModalOpen = !this.isModalOpen;
  }
  saveNewHero():void{
    console.log(this.newHeroData);
    this.heroService.saveNewHero(this.newHeroData).subscribe((_)=>{
      this.getHeroes();
      this.newHeroData = {} as Hero;
      this.isModalOpen=false;
      console.log('dismiss');
      
    });
  }

  editHero(id:number){
    
    if(this.selectedHero!['id'] ===id){
      console.log('chachi'); 
      this.heroService.updateHero(this.selectedHero!).subscribe((_)=>this.getHeroes());
    } else{
      console.error('error de coincidencia')
    }
    
  }

  deleteHero(id:number, event:any){
    event.stopPropagation();
    console.log('borrar', id);
    this.heroService.deleteHero(id).subscribe((_)=>this.getHeroes());
  }

  selectHero(hero:Hero){
    this.selectedHero = hero;
    this.newPower = '';
    console.log('select');
    
  }
  

  deselectHero(event?:any){  
    // console.log(event.srcElement.tagName);
    const exceptions = ['input','button','ion-icon']
    let clickedElement = event.srcElement.tagName.toLowerCase(); 
    if(!exceptions.includes(clickedElement)){
      this.selectedHero = {} as Hero;
    } else{
      console.log('exception');
      
    }
  }
  



  //POWERS
  addPower(heroId:number, event:any){
    event.stopPropagation();
    if (this.newPower.length>0){
      this.powerService.saveNewPower(heroId,this.newPower)
      .subscribe((_)=>{
        this.getPowersByHero(heroId);
        console.log(this.selectedHero.powers);
        this.newPower='';
      });
    }
  }
  deletePower(power:any, hero:Hero, event:any){
    event.stopPropagation();
    this.powerService.deletePower(power.id)
    .subscribe((_)=>{
        this.selectedHero.powers = this.selectedHero.powers.filter((el:any)=>el['id']!==power.id)

        // this.getPowersByHero(hero.id);
        console.log('deletePower',power, event);
      });
  }
  getPowersByHero(heroId:number){
    this.powerService.getPowersByHero(heroId).subscribe((data)=>{
    //   // console.log('subs', data);
      this.selectedHero.powers= data
    });
    
  }

}
