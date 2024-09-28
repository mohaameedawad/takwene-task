import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  exports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    RouterModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService], // Provide MessageService here
})
export class SharedModule {}
