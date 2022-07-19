import { Component } from '@angular/core'
import { HeaderService, Menu } from '@northfork/header'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tester-application'

  constructor() {
    HeaderService.registerApp('tester-application', [
      { route: '/main-view', displayValue: 'Main View' },
    ])

    // The following will add an item to the general settings dropdown
    const settingsMenu = [{ text: '', callback: () => {} }]
    HeaderService.addItems(Menu.settings, settingsMenu, 'tester-application')
  }
}
