import { Component, OnInit } from '@angular/core';
import { VoteService } from '@app/services/vote.service';
import { Vote } from '@app/features/vote/vote-models';

@Component({
  selector: 'qv-add-vote',
  templateUrl: './add-vote.component.html',
})
export class AddVoteComponent implements OnInit {
  constructor(private voteService: VoteService) {}

  ngOnInit() {}

  saveVote(vote: Vote) {
    console.log(vote);
    this.voteService.saveVote(vote);
  }
}
