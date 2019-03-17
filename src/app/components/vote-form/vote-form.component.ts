import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Vote } from '@app/features/vote/vote-models';

@Component({
  selector: 'qv-vote-form',
  templateUrl: './vote-form.component.html',
})
export class VoteFormComponent implements OnInit {
  createVote: FormGroup;

  @Output()
  onSubmit = new EventEmitter<Vote>();

  get answers() {
    return this.createVote.get('answers') as FormArray;
  }

  get answersIter() {
    return (this.createVote.get('answers') as FormArray).controls;
  }

  constructor(private fb: FormBuilder) {
    this.createVote = this.fb.group({
      title: ['', Validators.required],
      question: ['', Validators.required],
      answers: this.fb.array([this.createControl()], Validators.required),
    });
  }

  ngOnInit() {}

  addAnswer(event: Event): void {
    console.log(event);
    return this.answers.push(this.createControl());
  }

  createControl = () =>
    this.fb.group({
      answer: ['', Validators.required],
      value: [0],
      amount: [0],
      median: [0],
    });

  removeAnswer(number: number): void {
    this.answers.removeAt(number);
  }

  createAnswer(fc: FormControl, name: string): void {
    return (this.createVote.get('answers') as FormGroup).addControl(name, fc);
  }
}
