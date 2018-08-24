import { NgModule } from '@angular/core';
import { MatTabsModule, MatCardModule, MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';

const modules = [
  MatTabsModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule
];


@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
