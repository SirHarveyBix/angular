import { Component } from '@angular/core';
interface ServerI {
  serverName: string;
  serverContent: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements = [
    {
      type: 'server',
      name: 'Testserver',
      content: 'just a test',
    },
  ];
  constructor() {}

  onServerAdded(serverData: ServerI) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(blueprintData: ServerI) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }

  onChangeFirst() {
    console.log('Hooks : ngOnChanges(), ngDoCheck(), are called !');
    this.serverElements[0].name = 'Changed !';
  }
  onDestroyFirst() {
    console.log('Hook : ngOnDestroy(), is called !');
    this.serverElements.splice(0, 1);
  }
}
