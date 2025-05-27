import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NavComponent, RouterModule, FooterComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear session storage or authentication token
    sessionStorage.removeItem('user');
    this.router.navigate(['/']); // Redirect to login page
  }
}

