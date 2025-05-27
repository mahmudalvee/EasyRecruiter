import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, RouterModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent { }
