import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-side-menu-bar',
  templateUrl: './app-side-menu-bar.component.html',
  styleUrls: ['./app-side-menu-bar.component.scss']
})
export class AppSideMenuBarComponent {

  /* Value of the state of the side-menu. */
  @Input()
  pinned = false;

  /* Emits the 'pinned' boolean to other components when the pinned value changes. */
  @Output()
  pinnedChange: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public translate: TranslateService,
    private router: Router
  ) { }

  /*
    Handles the functionality when the selected language changes. Defaults to the default language (EN) when invalid.
    Saves the selected language to localstorage

    @param language: string
    Contains the short value of the language. Ex: nl
  */
  onChangeLanguage(language: string): void {
    if (!this.translate.langs.includes(language)) {
      language = this.translate.getDefaultLang();
    }

    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  /*
    Translates a language to the correct language. Ex: when nl is the selected language. Translate English -> Engels

    @param language: string
    Contains the language to translate. Ex: nl
  */
  translateLanguage(language: string): string {
    return this.translate.instant(`SIDE_BAR.LANGUAGES.${language.toUpperCase()}`);
  }

  /*
    Checks the current route of the browser and returns css style to show the selected item in the menu bar.

    @param buttonRoute: string
    Contains route of the button. Ex: products/add. Returns css styling when on this route
  */
  isOnRoute(buttonRoute: string): string {
    return this.router.url.endsWith(buttonRoute) ? 'background:rgba(156,39,176,.15); color:#d176e1;' : '';
  }

  /*
    Navigates to the correct webpage when a navigation button is clicked.

    @param route: string
    Contains the location where the browser has to navigate to. Ex: home
  */
  onClickNavigate(route: string): void {
    switch (route) {
      case 'addproduct':
        this.router.navigate(['products/add']);
        break;
      case 'cart':
        this.router.navigate(['cart']);
        break;
      case 'products':
        this.router.navigate(['products']);
        break;
      case 'catalog':
        this.router.navigate(['catalog']);
        break;
      case 'reservations':
        this.router.navigate(['reservations']);
        break;
      case 'login':
        this.router.navigate(['login']);
        break;
      case 'users':
        this.router.navigate(['users']);
        break;
      default:
        break;
    }
  }

  /*
    Call the logout function in the sessionService.
  */
  onClickLogout(): void {
    // this.sessionService.logout();
    return;
  }

  /*
    Reverses the pin state of the menu and emit this value.
  */
  onClickPinMenu(): void {
    this.pinned = !this.pinned;
    this.pinnedChange.emit(this.pinned);
  }
}
