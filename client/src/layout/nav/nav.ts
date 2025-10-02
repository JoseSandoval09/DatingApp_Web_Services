import { Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {};
  private toast = inject(ToastService);
  private router = inject(Router);
  

  login(): void {
    this.accountService.login(this.creds).subscribe(
      {
        next: response => {
          this.router.navigateByUrl('/members');
          this.creds = {};
          this.toast.success("Logged in")
          
        },
        error: error =>
        this.toast.error("Login failed: " + error.message)
      }
    );
  }
  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
