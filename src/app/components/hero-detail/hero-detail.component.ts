import { Hero } from './../../model/hero';
import { HeroService } from './../../service/hero.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, // 服务注入到构造函数中，将他们的值保存到私有变量里
    private heroService: HeroService,
    private location: Location
  ) {}

  @Input() hero: Hero; // 这个组件所做的只是通过 hero 属性接收一个英雄对象，并显示它。

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
