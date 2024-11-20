import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OvsBodyComponent } from './ovs-body/ovs-body.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CandidateComponent } from './candidate/candidate.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path:'',
    component:OvsBodyComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'candidates',
    component:CandidateComponent
  },
  {
    path:'results',
    component:ResultsComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
  // {
  //   path:'',
  //   component:LoginComponent
  // },
  // {
  //   path:'signup',
  //   component:SignupComponent
  // },
  // {
  //   path:'about',
  //   component:OvsBodyComponent
  // },
  // {
  //   path:'candidates',
  //   component:CandidateComponent
  // },
  // {
  //   path:'contact',
  //   component:ContactComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
