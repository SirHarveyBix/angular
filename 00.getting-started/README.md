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

la recuperation d'un parametre, ressemblera a ça : 

```js
  (input)="onUpdateServerName($event)"
```
