import { QuestionControlService } from './../../../service/question-control.service';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './../../../model/dynamic-form/question-base';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any> [] = [];
  form: FormGroup;
  payload = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.value);
  }

}
