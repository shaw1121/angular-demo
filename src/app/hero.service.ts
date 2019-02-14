import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root' // 指定把被装饰类的提供商放到 root 注入器中
})
export class HeroService {

  // Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中。
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {

    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES); // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
