import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwithchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
    } else {
      this.authService
        .singUp(form.value.email, form.value.password) //
        .subscribe(
          (response) => {
            this.isLoading = false;
          },
          (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        );
    }

    form.reset();
  }
}
