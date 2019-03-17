import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vote } from '@app/features/vote/vote-models';
import { calcNumOfSteps, mediumVoteCalc } from '@app/utils/medium-calculations';

@Component({
  selector: 'qv-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
})
export class VoteCardComponent implements OnInit {
  step = 0.5;
  min = 0;
  max = 10;
  numOfSteps = 0;

  @Input() vote: Vote;

  @Output() onShowDetails = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    this.numOfSteps = calcNumOfSteps(this.max, this.step);
  }

  calcMediumVal = (value, amount) => mediumVoteCalc(value, amount);

  calcMediumPos = (value, max) => -((value / max) * -100 + 100);
}
