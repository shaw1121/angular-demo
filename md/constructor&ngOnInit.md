
# constructor VS. ngOnInit

question: 

下列代码放在 constructor 和 ngOnInit()中有何区别

```js
constructor(private infraFacade: InfraFacade, private route: ActivatedRoute) {
    this.navigationNodes$ = this.infraFacade.sortedListItemsOfInfrasBySearchTerm$;
}
```

**Constructor**
The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses. 

Angular or better Dependency Injector (DI) analyzes the constructor parameters and when it creates a new instance by calling `new MyClass()`, it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor like
```js
new MyClass(someArg);
```

**ngOninit**
`ngOnInit` is a life cycle hook called by Angular2 to indicate that Angular is done creating the component.

We have to import OnInit in order to use like this (actually implementing OnInit is not mandatory but considered good practice):
```js
import {Component, OnInit} from '@angular/core';
```
then to use the method of `OnInit` we have to implement in the class like this.
```js
export class App implements OnInit{
  constructor(){
     //called first time before the ngOnInit()
  }

  ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges() 
  }
}
```
>
    Implement this interface to execute custom initialization logic after your directive's data-bound properties have been initialized. ngOnInit is called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked. It is invoked only once when the directive is instantiated.

## ngOninit or constructor   
Mostly we use `ngOnInit` for all the initialization/declaration and avoid stuff to work in the constructor. The constructor should only be used to initialize class members but shouldn't do actual "work".

So you should use `constructor()` to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.

Angular bootstrap process consists of the two major stages:

* constructing components tree
* running change detection

The constructor of the component is called when Angular constructs components tree. All lifecycle hooks are called as part of running change detection.

When Angular constructs components tree the root module injector is already configured so you can inject any global dependencies. Also, when Angular instantiates a child component class the injector for the parent component is also already set up so you can inject providers defined on the parent component including the parent component itself. Component constructors is the only method that is called in the context of the injector so if you need any dependency that's the only place to get those dependencies.

When Angular starts change detection the components tree is constructed and the constructors for all components in the tree have been called. Also every component's template nodes are added to the DOM. The `@Input` communication mechanism is processed during change detection so you cannot expect to have the properties available in the constructor. It will be available on after ngOnInit.

Let's see a quick example. Suppose you have the following template:
```js
<my-app>
   <child-comp [i]='prop'>
```
So Angular starts bootstrapping the application. 

1. It first creates classes for each component. So it calls MyAppComponent constructor. It also creates a DOM node which is the host element of the my-app component. Then it proceeds to creating a host element for the child-comp and calling ChildComponent constructor. At this stage it's not really concerned with the `i` input binding and any lifecycle hooks. So when this process is finished Angular ends up with the following tree of component views:
```js
MyAppView
  - MyApp component instance
  - my-app host element data
       ChildCompnentView
         - ChildComponent component instance
         - child-comp host element data  
```

2. Only then runs change detection and updates bindings for the my-app and calls `ngOnInit` on the `MyAppComponent` class. Then it proceeds to updating the bindings for the `child-comp` and calls `ngOnInit` on the `ChildComponent` class.

The `@Input` communication mechanism is processed during change detection so you cannot expect to have the properties available in the `constructor`. It will be available on after `ngOnInit`.

Refer:   
https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit/45430181#45430181
