import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    // private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      console.log('%cNew Status: ', 'color: #ed0a0a;', status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // accessing to services this way is not good practice =>
    // const service = new LoggingService();
    // this.service.logStatusChange(accountStatus);

    // this.loggingService.logStatusChange(accountStatus);
  }
}
