import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class SharedModulesModule { }
