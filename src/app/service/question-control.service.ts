import { FormControl, Validators, FormGroup } from '@angular/forms';
import { QuestionBase } from './../model/dynamic-form/question-base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  // 把问卷问题转换为 FormGroup 
  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }
}
