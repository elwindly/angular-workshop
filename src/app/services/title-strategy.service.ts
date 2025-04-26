import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    console.log(routerState);
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `My App - ${title}`;
    } else {
      document.title = routerState.url.replace('/', '');
    }
  }
}
