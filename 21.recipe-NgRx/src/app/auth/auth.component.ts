import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AppState } from '../store/app.reducer';
import { clearError, loginStart, signupStart } from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy, OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSubscription: Subscription;
  private storeSubscription: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
  }

  onSwithchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({ email, password }));
    } else {
      this.store.dispatch(signupStart({ email, password }));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
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
