import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() hero: Hero; // 这个组件所做的只是通过 hero 属性接收一个英雄对象，并显示它。
  
}
