import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPointPageRoutingModule } from './add-point-routing.module';

import { AddPointPage } from './add-point.page';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPointPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AddPointPage]
})
export class AddPointPageModule {}
