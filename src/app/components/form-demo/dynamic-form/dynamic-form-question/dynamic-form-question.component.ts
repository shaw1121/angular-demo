import { FormGroup } from '@angular/forms';
import { QuestionBase } from './../../../../model/dynamic-form/question-base';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

}
