import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { VoteCardModule } from '@app/components/vote-card/vote-card.module';
import { AddVoteModule } from '@app/containers/add-vote/add-vote.module';
import { MainNavModule } from '@app/material/main-nav/main-nav.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MainNavModule,
    VoteCardModule,
    AddVoteModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
