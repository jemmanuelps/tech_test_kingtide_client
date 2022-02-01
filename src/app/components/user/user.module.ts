import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [UserComponent],
  entryComponents: [UserComponent]
})
export class UserModule { }
