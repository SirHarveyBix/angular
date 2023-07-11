# Bases

## Binding

string interpolation : c'est comme apeller une variable =

```js
  {{ variable }}
```

property / data binding : c'est lier un attribu (ici HTML) a une valeur =

```js
  [disabled]="!allowNewServers"
```

event binding : c'est declancher une fonction lors d'un evenement =

```js
  (click)="onCreateServer()"
```

la recuperation d'un parametre, ressemblera a ça =

```js
  (input)="onUpdateServerName($event)"
```

- selon ChatGPT =

   >`(input)="onUpdateServerName($event)"` est un exemple de récupération d'un événement d'entrée (`input`) et de passage de son objet `$event` à la fonction `onUpdateServerName()`.

two-way binding permet de lier une valeur a un composant =

```js
  [(ngModel)]="serverName"
```

## Directives

les directives se declarent avec `*` =

```js
  *ngIf="serverCreated"
```

- pour aller plus loin avec les conditions, `#noServer`, fait reference a `else noServer` present dans `*ngIf` =

    ```html
    <p *ngIf="serverCreated; else noServer">
      Server was created, server name is {{ serverCreationStatus }}
    </p>
    <ng-template #noServer>
      <p>No server was created</p>
    </ng-template>
  ```
