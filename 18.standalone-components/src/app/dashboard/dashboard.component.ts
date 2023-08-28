import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [RouterModule], // to "unlock" directives : routerLink="today" of html file
})
export class DashboardComponent {}
