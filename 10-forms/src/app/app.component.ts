import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm;
  defaultQuestion = 'pet';

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm) {
  onSubmit() {
    console.log(this.signupForm);
  }
}
