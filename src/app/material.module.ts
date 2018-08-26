import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule
} from '@angular/material';

const modules = [
  MatTabsModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule
];


@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
