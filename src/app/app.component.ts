import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);

  readonly isDark = signal(false);

  readonly navList = signal([
    'intro',
    'angular-14',
    'angular-15',
    'angular-16',
    'angular-17',
    'angular-18',
    'angular-19',
    'angular-20',
    'angular-21',
  ]);

  constructor() {
    effect(() => this.applyTheme(this.isDark()));
  }

  toggleTheme(checked: boolean): void {
    this.isDark.set(checked);
  }

  private applyTheme(isDark: boolean): void {
    const root = this.document.documentElement.classList;
    root.toggle('dark-mode', isDark);
    root.toggle('light-theme', !isDark);
  }
}
