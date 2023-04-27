import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule} from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './nav/head.component';
import { MatTableModule } from '@angular/material/table';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';

import { MatDialogModule} from '@angular/material/dialog';

import {MatStepperModule} from '@angular/material/stepper'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatDatepickerModule} from '@angular/material/datepicker'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,MatIconModule,MatPaginatorModule,MatFormFieldModule,
    MatSortModule, MatInputModule, MatSelectModule, MatToolbarModule, MatTableModule,
    HttpClientModule, ReactiveFormsModule,
    MatDialogModule,
    MatStepperModule,MatSnackBarModule,
    MatDatepickerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
