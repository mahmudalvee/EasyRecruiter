import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RequisitionComponent } from './pages/requisition/requisition.component';
import { CVBankComponent } from './pages/cvbank/cvbank.component';
import { AssessmentComponent } from './pages/assessment/assessment.component';
import { OfferLetterComponent } from './pages/offer-letter/offer-letter.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'requisition', component: RequisitionComponent },
  { path: 'cvbank', component: CVBankComponent },
  { path: 'assessment', component: AssessmentComponent },
  { path: 'offer-letter', component: OfferLetterComponent },
];

