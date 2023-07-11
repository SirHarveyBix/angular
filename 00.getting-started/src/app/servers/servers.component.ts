import { Component } from '@angular/core';

@Component({
  selector: '[app-servers]',
  // template: `<app-server></app-server> <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowNewServers = false;
  serverCreationStatus = 'No server was created!';
  serverName = '';

  constructor() {
    setTimeout(() => {
      this.allowNewServers = true;
    }, 2000);
  }

  onCreateServer = () => {
    this.serverCreationStatus = 'Server was created';
  };

  onUpdateServerName = (event: Event) => {
    this.serverName = (event.target as HTMLInputElement).value;
  };
}
