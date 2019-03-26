import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSnackBarModule,
} from '@angular/material';
import { MainNavComponent } from './main-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginDialogModule } from '@app/components/login-dialog/login-dialog.module';
import { VarDirectiveModule } from '@app/pipes/var/var-directive.module';

@NgModule({
  declarations: [MainNavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    LoginDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    VarDirectiveModule
  ],
  exports: [MainNavComponent],
})
export class MainNavModule {}
