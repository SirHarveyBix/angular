import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSubscription: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwithchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(
        form.value.email,
        form.value.password
      );
    } else {
      authObservable = this.authService.singUp(
        form.value.email,
        form.value.password
      );
    }

    authObservable.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage: string) => {
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    this.alertHost.viewContainerRef.clear();
    const componentRef = this.alertHost.viewContainerRef //
      .createComponent(AlertComponent);
    componentRef.instance.message = message;

    this.closeSubscription = componentRef.instance.close //
      .subscribe(() => {
        this.closeSubscription.unsubscribe();
        this.alertHost.viewContainerRef.clear();
      });
  }
}
