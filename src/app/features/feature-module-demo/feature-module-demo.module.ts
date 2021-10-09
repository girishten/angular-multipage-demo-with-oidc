import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleDemoRoutingModule } from './feature-module-demo-routing.module';
import { FeatureModuleDemoComponent } from './feature-module-demo.component';

@NgModule({
  declarations: [FeatureModuleDemoComponent],
  imports: [CommonModule, FeatureModuleDemoRoutingModule],
})
export class FeatureModuleDemoModule {}
