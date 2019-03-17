import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVoteComponent } from './add-vote.component';
import { FormsModule } from '@angular/forms';
import { VoteFormModule } from '@app/components/vote-form/vote-form.module';

@NgModule({
  declarations: [AddVoteComponent],
  imports: [CommonModule, FormsModule, VoteFormModule],
  exports: [AddVoteComponent],
})
export class AddVoteModule {}
