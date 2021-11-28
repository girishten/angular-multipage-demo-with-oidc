import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleDemoComponent } from './feature-module-demo.component';

const routes: Routes = [{ path: '', component: FeatureModuleDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleDemoRoutingModule {}
