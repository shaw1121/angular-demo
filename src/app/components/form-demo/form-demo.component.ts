import { QuestionService } from './../../service/question.service';
import { SuperHero } from './../../model/super-hero';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component } from '@angular/core';
import { forbiddenNameValidator } from 'src/app/directive/forbidden-name.directive';

@Component({
  selector: 'app-reactive-favorite-color',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})
export class FormDemoComponent {

  questions: any[];

  constructor(private fb: FormBuilder, questionService: QuestionService) { 
    this.questions = questionService.getQuestions();
  }

  favoriteColorControl = new FormControl('');

  name = new FormControl('');

  favoriteColor = '';

  updateName() {
    this.name.setValue('shaw');
    this.name.reset()
  }

  // formGroup demo
  profileForm1 = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  })

  // use formBuilder
  profileForm = this.fb.group({
    firstName: ['', [Validators.required, forbiddenNameValidator(/shaw/i)]],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  })

  onSubmitReactiveForm() {
    console.warn(this.profileForm.value);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  // 模板驱动表单 start
  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  model = new SuperHero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    this.model = new SuperHero(42, '', '');
  }

  // 模板驱动表单 over

}
