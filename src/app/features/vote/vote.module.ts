import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VoteEffects } from './vote.effects';
import * as fromVote from './vote.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('vote', fromVote.reducer),
    EffectsModule.forFeature([VoteEffects]),
  ],
})
export class VoteModule {}
