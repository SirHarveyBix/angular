import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

interface ServerI {
  serverName: string;
  serverContent: string;
}

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @Output('srvCreated') serverCreated = new EventEmitter<ServerI>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<ServerI>();

  /* access from : #serverContentInput, get a reference, to the DOM
      an object, get the value in the object this way : this.serverContentInput.nativeElement.value
      this is not a way to manipulate the DOM */
  @ViewChild('serverContentInput', { static: true })
  serverContentInput: ElementRef;
  // newServerName = '';
  // newServerContent = '';

  onAddServer(nameInput: HTMLInputElement) {
    console.log(this.serverContentInput);
    this.serverCreated.emit({
      /* retrived from : (click)="onAddServer(serverNameInput)",
      thanks to the local reference : #serverNameInput */
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value,
      // serverName: this.newServerName,
      // serverContent: this.newServerContent,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
