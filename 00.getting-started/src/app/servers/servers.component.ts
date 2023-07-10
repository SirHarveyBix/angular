import { Component } from '@angular/core';

@Component({
  selector: '[app-servers]',
  // template: `<app-server></app-server> <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowNewServers = false;
  constructor() {
    setTimeout(() => {
      this.allowNewServers = true;
    }, 2000);
  }
}
