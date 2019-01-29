import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

// 逻辑
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // 1. 声明了一个私有 heroService 属性，
  // 2. 把它标记为一个 HeroService 的注入点
  // 让构造函数保持简单，只做初始化操作，比如把构造函数的参数
  // 赋值给属性。 构造函数不应该做任何事。 它当然不应该调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  // heroes = HEROES;
  heroes: Hero[];

  getHeroes(): void{
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  // selectedHero: Hero;
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
