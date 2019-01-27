import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  // path: 一个用于匹配浏览器地址栏中 URL 的字符串
  // component: 当导航到此路由时，路由器应该创建哪个组件
  {path: 'heroes', component: HeroesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule] // 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
})
export class AppRoutingModule { }
