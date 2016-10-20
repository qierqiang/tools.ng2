import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <dashboard></dashboard>
  <logger></logger>
	<footer>© 2016 戚尔强</footer>`,
  styles:   [`footer { color: #999; text-align: center; }`]
})

export class AppComponent { }
