import { QuestionService } from './service/question.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HighlightDirective } from './directive/highlight.directive';
import { UnlessDirective } from './directive/unless.directive';
import { DatePipeComponent } from './components/date-pipe/date-pipe.component';
import { ExponentialStrengthPipe } from './pipe/exponential-strength.pipe';
import { PowerBoosterComponent } from './components/power-booster/power-booster.component';
import { FlyingHeroesComponent } from './components/flying-heroes/flying-heroes.component';
import { FlyingHeroesPipe, FlyingHeroesImpurePipe } from './pipe/flying-heroes.pipe';
import { HeroChildComponent } from './components/hero-child/hero-child.component';
import { HeroParentComponent } from './components/hero-parent/hero-parent.component';
import { NameChildComponent } from './components/name-child/name-child.component';
import { NameParentComponent } from './components/name-parent/name-parent.component';
import { VersionParentComponent } from './components/version-parent/version-parent.component';
import { VersionChildComponent } from './components/version-child/version-child.component';
import { VoterChildComponent } from './components/voter-child/voter-child.component';
import { VoterParentComponent } from './components/voter-parent/voter-parent.component';
import { CustomerDashboardModule } from './components/customer-dashboard/customer-dashboard.module';
import { FormDemoComponent } from './components/form-demo/form-demo.component';
import { ForbiddenNameDirective } from './directive/forbidden-name.directive';
import { DynamicFormComponent } from './components/form-demo/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/form-demo/dynamic-form/dynamic-form-question/dynamic-form-question.component';


@NgModule({
  declarations: [ // 每个组件都必须声明在（且只能声明在）一个 NgModule 中。
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HighlightDirective,
    UnlessDirective,
    DatePipeComponent,
    ExponentialStrengthPipe,
    PowerBoosterComponent,
    FlyingHeroesComponent,
    FlyingHeroesPipe,
    HeroChildComponent,
    HeroParentComponent,
    NameChildComponent,
    NameParentComponent,
    VersionParentComponent,
    VersionChildComponent,
    VoterChildComponent,
    VoterParentComponent,
    FormDemoComponent,
    ForbiddenNameDirective,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    FlyingHeroesImpurePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )

    CustomerDashboardModule // 特性模块
  ],
  providers: [
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
