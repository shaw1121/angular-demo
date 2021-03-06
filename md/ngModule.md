
# NgModule

NgModule 是一个带有 @NgModule() 装饰器的类。@NgModule() 装饰器是一个函数，它接受一个元数据对象，该对象的属性用来描述这个模块。其中最重要的属性如下。

* declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。

Specifies a list of directives/pipes that belong to this module.

* exports（导出表） —— The subset of declarations that should be visible and usable in the component templates of other NgModules

> Specifies a list of directives/pipes/modules that can be used within the template
  of any component that is part of an Angular module that imports this Angular module.
  对于导入了该 Angular module 的的 Angular module 的任何组件，指定可以在模板中使用的指令/管道/模块的列表

* imports（导入表） —— Specifies a list of modules whose exported directives/pipes should be available to templates in this module.

指定模块组，它们导出的 directives/pipes 在该模块的模板中应当可用。

* providers —— 

Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level, which is often preferred.)
本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。（你也可以在组件级别指定服务提供商，这通常是首选方式。）

Defines the set of injectable objects that are available in the injector of this module.

* bootstrap —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。

     * Defines the components that should be bootstrapped when
     this module is bootstrapped. The components listed here
     will automatically be added to `entryComponents`.

# Angular modules (NgModule) and their scopes

The purpose of a NgModule is to declare each thing you create in Angular, and group them together (like Java packages or PHP / C# namespaces).

There is two kind of main structures:

* “declarations” is for things you’ll use in your templates: mainly components (~ views: the classes displaying data), but also directives and pipes,
* “providers” is for services (~ models: the classes getting and handling data).

## Scope

* **declarations / components** are in local scope (private visibility),
* **providers / services** are (generally) in global scope (public visibility).

It means the components you declared are only usable in the current module. If you need to use them outside, in other modules, you’ll have to export them:


* imports for module

    if the module is imported for **components**, you’ll need to import it in each module needing them,
    if the module is imported for **services**, you’ll need to import it only once, in the first app module.


When to import main Angular modules?

A good knowledge of Angular modules is then required, to know how many times you need to import them. Here is an helpful summary.

Modules to import each time you need them

*    CommonModule (all the basics of Angular templating: bindings, *ngIf, *ngFor…), except in the first app module, because it’s already part of the BrowserModule
*    FormsModule / ReactiveFormsModule
*    MatXModule and other UI modules
*    any other module giving you components, directives or pipes

Modules to import only once

* HttpClientModule
*    BrowserAnimationsModule or NoopAnimationsModule
*    any other module providing you services only.

That’s why with Angular CLI, CommonModule is automatically imported when you create a new module.


Refer
https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407