import { HeroChildComponent } from './hero-child/hero-child.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  // path: 一个用于匹配浏览器地址栏中 URL 的字符串
  // component: 当导航到此路由时，路由器应该创建哪个组件
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: './dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'hero', component: HeroChildComponent, data: {title : 'test-router'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), CommonModule],
  exports: [RouterModule] // 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
})
export class AppRoutingModule { }
