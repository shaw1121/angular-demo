import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true}] 
})
export class ForbiddenNameDirective implements Validators {

  constructor() { }

  // 添加自定义验证器到模板驱动表单中
 @Input('appForbiddenName') forbiddenName: string;

 validate(control: AbstractControl): {[key: string]: any} | null {
  return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control) : null;
 }

}

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}