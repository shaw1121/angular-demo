# How to run jQuery in Angular 6?

1. First you need to run below command into your terminal:
```js
  $ npm install jquery --save
```
2. Add below jquery file path into your angular.json file:

> "scripts": ["node_modules/jquery/dist/jquery.js"]

测试后，发现加在
```json
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "scripts": ["node_modules/jquery/dist/jquery.js"],
```
或者

```json
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "scripts": ["node_modules/jquery/dist/jquery.js"],
    "options": {
      "browserTarget": "financial-reporting-system:build"
    },
```
都不可以，然后把它们删掉，发现jquery依然可以正常工作。

3. Import jquery file into your app.module.ts file:

> import * as $ from 'jquery';

4. Declare and finally add jquery code into your app.component.ts file:

```ts
declare var $: any;

export class AppComponent {

  ngOnInit() {

  $('body').addClass('df');

  }

}
```

And you are done.

refer:   
https://therichpost.com/how-to-run-jquery-in-angular-6
